# BlockFundMe

## Introduction

BlockFundMe is an prototype decentralized application built on the Ethereum blockchain and a take on the crowd-funding business model.  This dApp was created as an educational exercise as part of the 2018 ConsenSys Developer Program.

As of now, the app is not live due an unresolved issues regarding the availability of the yet-to-be created contracts from the contract factory when running `npm run build`.

## Table of Contents
1. [Introduction](https://github.com/dbensik/blockfundme/blob/master/README.md#introduction)
2. [Project Description](https://github.com/dbensik/blockfundme/blob/master/README.md#project-description)
3. [Screenshots]()
4. [Tech](https://github.com/dbensik/blockfundme/blob/master/README.md#tech)
5. [Setup](https://github.com/dbensik/blockfundme/blob/master/README.md#setup)
6. [Testing](https://github.com/dbensik/blockfundme/blob/master/README.md#testing)
7. [To Do](https://github.com/dbensik/blockfundme/blob/master/README.md#to-do)

## Project Description

The goal of this project was to develop a better understanding of writing and deploying smart contracts with a secondary goal of developing the necessary skills to create a functional frontend for decentralized applications.

The decision not to use TruffleSuite for this project is the result of first using Truffle to develop some earlier applications and wanting a better understanding of what happens behind the scenes, which I think is critical before using a tool such as Truffle.

BlockFundMe is a crowdfunding app built as a decentralized app on to of the Ethereum blockchain.  User can create new Campaings by calling the `createCampaign()` function from the `CampaingFactory` that has been deployed to the Rinkeby test network.  Once a campaign has been created, users can add details about the campaign and why they are raising funds.  They can also add specific Projects to the Campaign.  Visitors can contribute to a Campaign and are then able to support specific Projects by Approving them.  Once a Project has support of >50% it will be Finalized by the Campaign creator and the funds will be transfered from the contract to the contract creator.


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

## Testing

The following tests are run successfully

  :white_check_mark: Deploys a factory and a campaign
  
  :white_check_mark: Correctly designates function caller as campaign manager
  
  :white_check_mark: Allows people to fund projects and marks them as supporters
  
  :white_check_mark: Requires a minimum contribution
  
  :white_check_mark: Allows manager to make a project (44ms)
  
  :white_check_mark: Handles projects 
  
NOTE: if testing with the currently deployed instance of the Campaign Factory contract, the first campaign at `0xD316756e5366993994a5EE8d8cce617a80681f64` was killed using the kill function in the contract connected to the "Cancel this Campaign" button on `http://localhost:3000/campaigns/0xD316756e5366993994a5EE8d8cce617a80681f64`.  This site now throws an error as I have not yet resolved how to remove this Campaign from the list of open campaigns.

## To Do
- Add minimum number of supporters required to Finalize Project in a Campaign .
- Finish developing frontend.  Adding details and descriptions to each page.
  - Deploy dApp to live site
  - currenttly trouble shooting issue during build process reguarding the dynamic URLs
- Integrate OpenZeppelin Ownable contract to replace current 'restricted' modifier
- Add Oracle service
- Develop and add additional contract in Vyper
- Deploy site to IPFS
- Integrate uPort
- Custom domain from ENS
