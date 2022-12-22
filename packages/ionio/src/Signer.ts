import * as ecc from 'tiny-secp256k1';
import { bip341, Pset, Transaction, Signer as PsetSigner } from "liquidjs-lib";

export type Signer = {
  signTransaction?(psetBase64: string): Promise<string>;
  signSchnorr?(sigHash: string, tx?: string): Promise<string>;
};

export const isSigner = (x: any): x is Signer => {
  const keys = Object.keys(x);
  return keys.includes('signTransaction') || keys.includes('signSchnorr');
}

export async function signInput(
  pset: Pset,
  index: number,
  signer: Signer,
  xOnlyPubKey: Buffer,
  genesisBlockHash: Buffer
): Promise<Pset> {
  if (!signer.signSchnorr)
    throw new Error('Signer does not implement signSchnorr');

  const input = pset.inputs[index];

  // skip if does not contain the tapLeafScript field
  if (input && !input.tapLeafScript) 
    throw new Error('Input does not contain tapLeafScript');

  // here we assume to spend the first leaf always in case more than one is provided
  const script = input.tapLeafScript![0].script;
  if (!script)
    throw new Error('Input does not contain tapLeafScript');

  const leafHash = bip341.tapLeafHash({
    scriptHex: script.toString('hex'),
  });

  const hashType = input.sighashType ?? Transaction.SIGHASH_ALL;
  const sighashForSig = pset.getInputPreimage(
    index,
    hashType,
    genesisBlockHash,
    leafHash
  );

  // sign it
  const hashTypeBuffer =
    hashType !== 0x00 ? Buffer.of(hashType) : Buffer.alloc(0);

  const signatureHex = await signer.signSchnorr(
    sighashForSig.toString('hex'), 
    pset.unsignedTx().toHex()
  );

  const signatureWithHashType = Buffer.concat([
    Buffer.from(signatureHex, 'hex'),
    hashTypeBuffer,
  ]);

  const taprootData = {
    tapScriptSigs: [
      {
        signature: signatureWithHashType,
        pubkey: xOnlyPubKey,
        leafHash,
      },
    ],
    genesisBlockHash:genesisBlockHash,
  };

  const psetSigner = new PsetSigner(pset);
  psetSigner.addSignature(index, taprootData, Pset.SchnorrSigValidator(ecc));

  return pset;
}
