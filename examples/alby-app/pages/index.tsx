import { useEffect, useState } from 'react';
import Head from 'next/head'
import * as ecc from 'tiny-secp256k1';
import secp256k1zkp from '@vulpemventures/secp256k1-zkp';
import * as noble from '@noble/secp256k1';
import { Contract, Artifact, Signer } from '@ionio-lang/ionio';
import { networks, Transaction, TxOutput } from 'liquidjs-lib';

import artifact from '../transfer_with_key.json';
import { ionioSigner } from '../utils/signer';
import { WsElectrumChainSource } from '../utils/electrum';
import QRCode from 'react-qr-code';

import * as nostr from 'nostr-tools';
import { Connect, ConnectURI } from '@nostr-connect/connect';

const privateKeyHex = '826dd029c1e569e68e36543d182dd10475e50d33646a79a264a9837d8ccd32f5';
// window.alby.getPublicKey()
const getPublicKey = () => {
  const privateKey = noble.utils.hexToBytes(privateKeyHex);
  const xonlypub = noble.schnorr.getPublicKey(privateKey);
  return xonlypub;
}
// window.alby.signSchnorr()
const signSchnorr = async (sigHash: Buffer): Promise<Buffer> => {
  const privateKey = noble.utils.hexToBytes(privateKeyHex);
  const sig = await noble.schnorr.sign(sigHash, privateKey);
  return Buffer.from(sig.buffer);
}


export default function Home() {

  const [prevout, setPrevout] = useState<TxOutput | null>(null);
  const [txFundVout, setFundTxVout] = useState<number | null>(null);
  const [txFundID, setFundTxID] = useState<string | null>(null);
  const [txSpendID, setSpendTxID] = useState<string | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [connected, setConnected] = useState(false);
  const [remoteSigner, setRemoteSigner] = useState<string | null>(null);
  const [connectURI, setConnectURI] = useState<string | null>(null);
  const [connectInstance, setConnectInstance] = useState<Connect | null>(null);

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value).then(undefined,
      function (err) {
        console.error('Async: Could not copy text: ', err);
      });
  }

  const compileContract = async () => {
    if (!connectInstance) return;

    const pubkey = await connectInstance.getPublicKey();
    const pubkeyBuffer = Buffer.from(pubkey, 'hex');

    const contract = new Contract(artifact as Artifact, [pubkeyBuffer], networks.testnet, { ecc, zkp: await secp256k1zkp() })

    // start watching for unspent output on the blockchain
    const electrum = WsElectrumChainSource.fromNetwork(networks.testnet.name)
    electrum.subscribeScriptStatus(contract.scriptPubKey, async (status) => {

      const unspents = await electrum.fetchUnspentOutputs([contract.scriptPubKey])
      if (unspents.length <= 0) return

      const [unspentsOfContract] = unspents
      if (unspentsOfContract.length <= 0) return

      console.debug(`New activity for contract ${artifact.contractName} at address: ${contract.address}`, status)

      // fetch also the whole prevout transaction
      const [firstUnspent] = unspentsOfContract
      const [transaction] = await electrum.fetchTransactions([firstUnspent.tx_hash])
      const tx = Transaction.fromHex(transaction.hex)
      const prevout = tx.outs[firstUnspent.tx_pos]

      // store the tx data of the funding transaction
      setPrevout(prevout)
      setFundTxVout(firstUnspent.tx_pos)
      setFundTxID(firstUnspent.tx_hash)
    })

    //store
    setContract(contract);
  }



  const burn = async () => {
    if (!contract)
      throw new Error('Contract not compiled yet')
    if (!txFundID || isNaN(txFundVout as number) || !prevout)
      throw new Error('Contract not funded yet')

    // create instance of live contract funded on the blockchain
    const instance = contract.from(txFundID, txFundVout as number, prevout)

    // create a transaction that burns the contract
    const signer: Signer = ionioSigner(
      Buffer.from(getPublicKey().buffer),
      async (sigHash: string) => {
        if (!connectInstance || !remoteSigner) return;
        const signature = await connectInstance.rpc.call({
          target: remoteSigner,
          request: {
            method: 'sign_schnorr',
            params: [sigHash]
          }
        });
        console.log(sigHash, signature);
        return signature;
      },
      networks.testnet.genesisBlockHash
    );    
    const tx = instance.functions.transfer(signer);

    // add the burn output where we burn all the coins minus 100 sats for the network fee
    tx.withOpReturn(100000 - 100, networks.testnet.assetHash)
    tx.withFeeOutput(100)


    // blind, sign and finalize the transaction 
    // NOTICE: the Ionio signer invokes the passed window.alby.signSchnorr method 
    try {
      await tx.unlock();
    } catch (e) {
      console.error(e)
      return;
    }

    // extract the raw hex of the transaction
    const hex = tx.toHex()

    // broadcast to network
    try {
      const response2 = await fetch('https://blockstream.info/liquidtestnet/api/tx', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: hex
      });
      const txid = await response2.text();
      setSpendTxID(txid)
    } catch (e) {
      console.debug(hex)
      console.error(e)
    }
  }

  const createConnectionString = (secretKey: string) => {

    const connectURI = new ConnectURI({
      target: nostr.getPublicKey(secretKey),
      relay: 'wss://nostr.vulpem.com',
      metadata: {
        name: 'Alby Website',
        description: 'This is an example of how to use Alby to sign transactions with Ionio contracts.',
        url: 'https://getalby.com',
        icons: ['https://getalby.com/website/_assets/logo-WIC6GJUP.svg'],
      },
    });
    return connectURI.toString();
  }

  useEffect(() => {
    (async () => {
      try {
        let secretKey = localStorage.getItem('@alby-v0/secret');
        const remoteSignerFromStore = localStorage.getItem('alby-v0/remote');
        if (remoteSignerFromStore && secretKey) {
          setConnected(true);
          setRemoteSigner(remoteSignerFromStore)
        } else {
          secretKey = nostr.generatePrivateKey();
          setConnected(false);
          setRemoteSigner(null);
          setConnectURI(createConnectionString(secretKey));
        }
        const connect = new Connect({ secretKey, relay: 'wss://nostr.vulpem.com' });
        connect.events.on('connect', (pubkey: string) => {
          setConnected(true);
          setConnectURI(null);
          setRemoteSigner(pubkey);
          localStorage.setItem('alby-v0/remote', pubkey);
          localStorage.setItem('@alby-v0/secret', secretKey!);
        });
        connect.events.on('disconnect', () => {
          setConnected(false);
          setRemoteSigner(null);
          setConnectURI(createConnectionString(secretKey!));
          localStorage.removeItem('alby-v0/remote');
          localStorage.removeItem('@alby-v0/secret');
        });
        // initialize the connection with the wallet
        await connect.init();
        setConnectInstance(connect);
      } catch (e) {
        console.error(e);
      }

    })();
  }, []);


  return (
    <>
      <Head>
        <title>⚡️ Alby Demo</title>
        <meta
          name="description"
          content="Alby Demo"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="hero is-medium is-primary">
        <div className="hero-body">
          <h1 className="title">🐝 Alby x 🌊 Ionio</h1>
          <p className="subtitle">
            Interact with Liquid smart contracts using an Alby extension
          </p>
        </div>
      </section>
      <section className="section">
        <h1 className="title">Transfer with key</h1>

        <div className="columns">
          <div className="column is-6">
            <div className="card">
              <div className="card-content">
                {
                  !connected ? (
                    <div className="content">
                      <h3 className="title">Nostr Connnect</h3>
                      <p className='subtitle'>📷 Scan with a Nostr Connect enabled app</p>
                      <br />
                      {connectURI && (
                          <a onClick={() => copyToClipboard(connectURI)}>
                            <QRCode
                              size={256}
                              value={connectURI}
                              viewBox={`0 0 256 256`}
                            />
                          </a>
                      )}
                    </div>
                  ) : (
                    <div className="content">
                      <h3 className="title">Connected </h3>
                      <p className='subtitle'>Remote signer 🖋 {remoteSigner?.substring(0, 8)}...{remoteSigner?.substring(remoteSigner.length - 8)}</p>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>

        <p className="subtitle">Simple taproot output with unspendable key-path and a CHECKSIG in a script-path </p>
        <p className='subtitle'>⚠️ Fund it with exactly <b>100k sats</b> </p>
        <div className="columns">
          <div className="column is-6">
            <div className="card">
              <div className="card-content">
                <div className='content'>
                  <h3 className="title">Public Key</h3>
                  <p className="subtitle">{contract ? (contract?.contractParams.pubKey as Buffer).toString('hex') : "Not set"}</p>
                </div>
                <div className="content">
                  <h3 className="title">Address</h3>
                  <p className="subtitle">{contract ? contract.address : "Not set"}</p>
                </div>
              </div>
              <div className='card-footer'>
                <div className='card-footer-item'>
                  <div className='buttons'>
                    <button disabled={!connected} onClick={compileContract} className='button is-info'>Compile Contract</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-3">
            <div className="card">
              <div className="card-content">
                <div className='content'>
                  <h3 className="title">Funding Transaction</h3>
                  <p className="subtitle">{txFundID ? txFundID : "Not funded yet."}</p>
                </div>
              </div>
              <div className='card-footer'>
                <div className='card-footer-item'>
                  <div className='buttons'>
                    <button disabled={!txFundID} onClick={burn} className='button is-info'>🔥 Burn all coins</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-3">
            <div className="card">
              <div className="card-content">
                <div className='content'>
                  <h3 className="title">Spending Transaction</h3>
                  <p className="subtitle">{txSpendID ? txSpendID : "Not spent yet."}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}