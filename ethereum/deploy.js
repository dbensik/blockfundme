const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');
const provider = new HDWalletProvider(
  'student return odor forest endless year pull vague pave magic interest donate',
  'https://rinkeby.infura.io/v3/dc1041925d9e49a68156f3fe3a651424'
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
