# BlockFundMe

## Introduction

BlockFundMe is an prototype decentralized application built on the Ethereum blockchain and a take on the crowd-funding business model.  This dApp was created as an educational exercise as part of the 2018 ConsenSys Developer Program.

As of now, the app is not live due an unresolved issues regarding the availability of the yet-to-be created contracts from the contract factory when running `npm run build`.

## Table of Contents
1. [Introduction](https://github.com/dbensik/Blockchain-Pick-Em/blob/master/README.md#introduction)
2. [Project Description](https://github.com/dbensik/Blockchain-Pick-Em/blob/master/README.md#project-description)
3. [Tech](https://github.com/dbensik/Blockchain-Pick-Em/blob/master/README.md#tech)
4. [Setup](https://github.com/dbensik/Blockchain-Pick-Em/blob/master/README.md#setup)
5. [To Do](https://github.com/dbensik/Blockchain-Pick-Em/blob/master/README.md#todo)

## Project Description

The goal of this project was to develop a better understanding of writing and deploying smart contracts with a secondary goal of developing the necessary skills to create a functional frontend for decentralized applications.

The decision not to use TruffleSuite for this project is the result of first using Truffle to develop some earlier applications and wanting a better understanding of what happens behind the scenes, which I think is critical before using a tool such as Truffle.


## Tech
  - Remix for initial development and testing of smart contracts 
  - ReactJS and NextJS for frontend
  - Semantic UI for frontend theme
  - Infura.io for deploying contract to Rinkeby test network
  
 ## Setup
 
To install, run, and test locally

 ```
 mkdir blockfundme && cd blockfundme
 git clone https://github.com/dbensik/blockfundme
 npm install
 ```
 In `ethereum/web3.js` add your own infura API key
 In `ethereum/deploy.js` add your own infura API key and wallet mnemonic
 
To test

first compile contracts in /ethereum then run tests from project root directory

```
cd ethereum
node compile.js
cd ../
npm run test
```
To run dApp locally

```
cd ethereum
node deploy.js
```
copy deployed contract address and past into ethereum/factory.js

then run `npm run dev` from project root directory and navigate to `localhost:3000`

## To Do
- Deploy dApp to hosting provider
  - currenttly trouble shooting issue during build process reguarding the dynamic URLs
- Integrate OpenZeppelin Ownable contract to replace current 'restricted' modifier
- Add Oracle service
- Develop and add additional contract in Vyper
- Deploy site to IPFS
