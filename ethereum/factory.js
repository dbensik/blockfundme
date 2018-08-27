import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xc0dfF117A4b3e152f9782AC0f24D7F1E1D392922' // deployed address
);

export default instance;
