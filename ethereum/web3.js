import Web3 from 'web3';

// add next.js server to account for users without metamask
let web3;
let API_KEY = "";

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined' ) { // check if running metamask in browser
  // in the browser and metamask is running
  web3 = new Web3(window.web3.currentProvider); // provider provided by metamask in the browser
} else {
  //  on the browser OR metamask is not available
  // setup provider through infura
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/' + API_KEY;
  );

  web3 = new Web3(provider);

}


export default web3;
