"use strict";(self.webpackChunkionio_website=self.webpackChunkionio_website||[]).push([[246],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return h}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=a.createContext({}),l=function(e){var t=a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=l(e.components);return a.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=l(n),h=r,m=d["".concat(c,".").concat(h)]||d[h]||u[h]||i;return n?a.createElement(m,o(o({ref:t},p),{},{components:n})):a.createElement(m,o({ref:t},p))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var l=2;l<i;l++)o[l]=n[l];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},6862:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return c},metadata:function(){return l},toc:function(){return p},default:function(){return d}});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),o=["components"],s={title:"Spending Contracts"},c=void 0,l={unversionedId:"SDK/transactions",id:"SDK/transactions",title:"Spending Contracts",description:"When calling a contract function on a Contract object, an incomplete Transaction object is returned. This transaction can be completed by providing a number of outputs using the withRecipient()] or withOpReturn()] functions. Other chained functions are included to set other transaction parameters.",source:"@site/docs/SDK/transactions.md",sourceDirName:"SDK",slug:"/SDK/transactions",permalink:"/docs/SDK/transactions",editUrl:"https://github.com/ionio-lang/ionio/tree/main/website/docs/SDK/transactions.md",tags:[],version:"current",frontMatter:{title:"Spending Contracts"},sidebar:"docsSidebar",previous:{title:"Contract Instantiation",permalink:"/docs/SDK/instantiation"}},p=[{value:"Transaction options",id:"transaction-options",children:[{value:"withRecipient()",id:"withrecipient",children:[{value:"Example",id:"example",children:[],level:4}],level:3},{value:"withOpReturn()",id:"withopreturn",children:[{value:"Example",id:"example-1",children:[],level:4}],level:3},{value:"withUtxo()",id:"withutxo",children:[{value:"Example",id:"example-2",children:[],level:4}],level:3}],level:2},{value:"Transaction finalization",id:"transaction-finalization",children:[{value:"unlock()",id:"unlock",children:[{value:"Example",id:"example-3",children:[],level:4}],level:3}],level:2}],u={toc:p};function d(e){var t=e.components,n=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"When calling a contract function on a Contract object, an incomplete Transaction object is returned. This transaction can be completed by providing a number of outputs using the ",(0,i.kt)("a",{parentName:"p",href:"/docs/sdk/transactions#withrecipient"},(0,i.kt)("inlineCode",{parentName:"a"},"withRecipient()"))," or ",(0,i.kt)("a",{parentName:"p",href:"/docs/sdk/transactions#withopreturn"},(0,i.kt)("inlineCode",{parentName:"a"},"withOpReturn()"))," functions. Other chained functions are included to set other transaction parameters."),(0,i.kt)("p",null,"Most of the available transaction options are only useful in very specific use cases, but the functions ",(0,i.kt)("a",{parentName:"p",href:"/docs/sdk/transactions#withrecipient"},(0,i.kt)("inlineCode",{parentName:"a"},"withRecipient()")),", ",(0,i.kt)("a",{parentName:"p",href:"/docs/sdk/transactions#withopreturn"},(0,i.kt)("inlineCode",{parentName:"a"},"withOpReturn()"))," and ",(0,i.kt)("a",{parentName:"p",href:"/docs/sdk/transactions#unlock"},(0,i.kt)("inlineCode",{parentName:"a"},"unlock()"))," are commonly used."),(0,i.kt)("h2",{id:"transaction-options"},"Transaction options"),(0,i.kt)("h3",{id:"withrecipient"},"withRecipient()"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"transaction.withRecipient(addressOrScript: string | Buffer, amount: number, assetID: string): TransactionInterface;\n")),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"withRecipient()")," function allows you to add outputs to the transaction. This function can be called any number of times, and the provided outputs will be added to the list of earlier added outputs. The ",(0,i.kt)("inlineCode",{parentName:"p"},"amount")," parameter is the amount of the output in satoshis. The ",(0,i.kt)("inlineCode",{parentName:"p"},"assetID")," parameter is the asset hash, if not provided, the Bitcoin asset hash for the selected network will be used."),(0,i.kt)("h4",{id:"example"},"Example"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},".withRecipient('ert1q5sshvz2rhwuvktrqckfxkere5p5a57ng76l9u3', 500000)\n")),(0,i.kt)("h3",{id:"withopreturn"},"withOpReturn()"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"transaction.withOpReturn(hexChunks: string[], value: number, assetID: string): TransactionInterface;\n")),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"withOpReturn()")," function allows you to add ",(0,i.kt)("inlineCode",{parentName:"p"},"OP_RETURN")," outputs to the transaction. The ",(0,i.kt)("inlineCode",{parentName:"p"},"hexChunks")," parameter include hex strings. The ",(0,i.kt)("inlineCode",{parentName:"p"},"amount")," parameter is the amount of the output in satoshis. The ",(0,i.kt)("inlineCode",{parentName:"p"},"assetID")," parameter is the asset hash, if not provided, the Bitcoin asset hash for the selected network will be used."),(0,i.kt)("h4",{id:"example-1"},"Example"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},".withOpReturn(['6d02'])\n")),(0,i.kt)("h3",{id:"withutxo"},"withUtxo()"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"transaction.withUtxo(outpoint: Outpoint): TransactionInterface;\n")),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"withUtxo()")," function allows you to provide one or many UTXOs to be used in the transaction. This function can be called any number of times, and the provided UTXOs will be added to the list of earlier added UTXOs."),(0,i.kt)("h4",{id:"example-2"},"Example"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},".withUtxo({\n  txid: utxo.txid, \n  vout: utxo.vout,\n  prevout: utxo.prevout\n})\n")),(0,i.kt)("h2",{id:"transaction-finalization"},"Transaction finalization"),(0,i.kt)("h3",{id:"unlock"},"unlock()"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"async transaction.unlock(signer?: Signer): Promise<TransactionInterface>;\n")),(0,i.kt)("p",null,"After completing a transaction, the ",(0,i.kt)("inlineCode",{parentName:"p"},"unlock()")," function can be used to finalize the transaction. An incomplete transaction cannot be sent."),(0,i.kt)("p",null,"If the contract needs a signature to be sent (ie. a ",(0,i.kt)("inlineCode",{parentName:"p"},"CHECKSIG")," opcode), the ",(0,i.kt)("inlineCode",{parentName:"p"},"unlock()")," function can be called with an optional ",(0,i.kt)("inlineCode",{parentName:"p"},"signer")," parameter. This parameter is an ",(0,i.kt)("inlineCode",{parentName:"p"},"Signer")," interface, which can be used to provide the signature."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"export interface Signer {\n  signTransaction(psetBase64: string): Promise<string>;\n}\n")),(0,i.kt)("h4",{id:"example-3"},"Example"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"import { alice } from './somewhere';\n\nconst tx = await instance.functions\n    .transfer()\n    .withRecipient(to, amount, network.assetHash)\n    .withFeeOutput(feeAmount)\n    .unlock();\n")))}d.isMDXComponent=!0}}]);