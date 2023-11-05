# DeezStealth

This repo contains the code for a project submission for BuildHACKS Hackathon on [buidlbox.io](https://app.buidlbox.io/buidlbox/buidlhacks) which ended Nov. 5th 2023

## About

DeezStealth is a dapp that allows users to create batch send transactions leveraging [EIP5664 Stealth Addresses](https://eips.ethereum.org/EIPS/eip-5564) on Linea Blockchain.

## Features

- login with [@metamask/sdk](https://metamask.io/sdk/) featuring the ability for users to login with both metamask mobile wallet and metamask browser extension
- upload .csv file to create stealth addresses for batch sending 
- [deezstealth.sol]() contract deployed and verified on Linea Goerli Testnet Blockchain

## Run 

git clone this repo:

```git clone ```

install dependencies:

```npm i```

run app:

```npm run dev```

### Technologies Used

- [@metamask/sdk](https://github.com/MetaMask/metamask-sdk)
- [DeCommas API](https://build.decommas.io/)
- [@DeCommas/sdk](https://github.com/DeCommas/decommas-sdk)
- [Vitejs](https://vitejs.dev/)
- [Linea BLockchain](https://linea.build/)
- [React](https://github.com/facebook/react)
- [react-drag-and-drop](https://www.npmjs.com/package/react-drag-drop-files)
- [SASS](https://github.com/sass/sass)

### Special Thanks

A special thanks to [devorsmth.eth](https://app.buidlguidl.com/builders/0x02d09E69e528d7DA14F32Cd21b55aFFa1FF7F873) and his build [stAdds](https://stadds.vercel.app/) which served as the inspiration for our dapp and to learn about EIP-5664

