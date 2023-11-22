<div align="center">
    <h1>🥷DeezStealth</h1>
</div>

<div align="center">
    <a href="">youtube video</a>
</div>

<br>

<div align="center">
<h2>About DeezStealth</h2>

![ninja](/src/assets/logo.png)
![buildHACKS](/src/assets/buildHACKS.png)
</div>

This repo contains the code for a project submission for BuildHACKS Hackathon on [buidlbox.io](https://app.buidlbox.io/buidlbox/buidlhacks) which ended Nov. 5th 2023

DeezStealth is a dapp that allows users to create batch send transactions leveraging [EIP5664 Stealth Addresses](https://eips.ethereum.org/EIPS/eip-5564) on Linea Blockchain.

## Features

- login with [@metamask/sdk](https://metamask.io/sdk/) featuring the ability for users to login with both metamask mobile wallet and metamask browser extension
- upload .csv file to create bulk stealth addresses for using in batch sending
- [deezstealth.sol](https://goerli.lineascan.build/address/0xF9223Ba23C6381b30405Ec6D72717E3294AC848e#code) contract deployed and verified on Linea Goerli Testnet Blockchain

## Run Front-end

git clone this repo:

```git clone ```

install dependencies:

```npm i```

run app:

```npm run dev```

## Backend Soliity Code

The smart contract solidity code and tests associated for this dApp are found in this [hardhat repo](https://github.com/bshevchenko/destealth)

The DeezStealth.sol contract is deployed and verified on to Linea Goerli [here](https://goerli.lineascan.build/address/0x04eac8cd77ae31c4eb22c6eb6cecac0a58e544fb)

### Technologies Used

- [@metamask/sdk](https://github.com/MetaMask/metamask-sdk)
- [DeCommas API](https://build.decommas.io/)
- [@DeCommas/sdk](https://github.com/DeCommas/decommas-sdk)
- [Vitejs](https://vitejs.dev/)
- [Linea BLockchain](https://linea.build/)
- [React](https://github.com/facebook/react)
- [react-drag-and-drop](https://www.npmjs.com/package/react-drag-drop-files)
- [SASS](https://github.com/sass/sass)
- [@typeform/embed-react](https://github.com/Typeform/embed/tree/main/packages/embed-react)

### Built By

- [web3senior](https://github.com/web3senior)
- [bshevchenko](https://github.com/bshevchenko)
- [tantodefi](https://github.com/tantodefi)

### Special Thanks

A special thanks to [devorsmth.eth](https://app.buidlguidl.com/builders/0x02d09E69e528d7DA14F32Cd21b55aFFa1FF7F873) and his build [stAdds](https://stadds.vercel.app/) which served as the inspiration for our dapp and to learn more about [EIP-5664 Stealth Addresses](https://vitalik.ca/general/2023/01/20/stealth.html)
