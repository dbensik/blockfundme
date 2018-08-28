const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');
let mnemonic = '';
let API_KEY = "";
const provider = new HDWalletProvider(
  mnemonic,
  'https://rinkeby.infura.io/v3/' + API_Key
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from ', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: "0x" + compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '5000000'})

  console.log('Contract deployed to ', result.options.address);
};

deploy();
