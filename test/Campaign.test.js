const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
// const web3 = new Web3(ganache.provider());
const provider = ganache.provider();
const web3 = new Web3(provider);

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaign;
let campaignAddress;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '5000000' })

  await factory.methods.createCampaign('100').send({ // 100 wei is min contribution
    from: accounts[0],
    gas: '1000000'
  });

  // [campaignAddress] put 1st item into campaignAddress
  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  );
}); // end beforeEach

describe('Campaigns', () => {

  it('Deploys a factory and a campaign', () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  }); // end it

  it('Correctly designates function caller as campaign manager', async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  }); // end it

  it('Allows people to fund projects and marks them as supporters', async () => {
    await campaign.methods.contribute().send({
      value: '200',
      from: accounts[1]
    });
    const isSupporter = await campaign.methods.supporters(accounts[1]).call();
    assert(isSupporter);
  }); // end it

  it('Requires a minimum contribution', async () => {
    try{
      await campaign.methods.contribute().send({
        value: '5', // set up to fail
        from: accounts[1]
      });
      assert(false); // test will fail if it gets here
    } catch(err){
      assert(err);
    } // end try/catch
  }); // end it

  it('Allows manager to make a project', async () => {
    await campaign.methods.createProject(
      'Paint the house',
      '100',
      accounts[1]
    ).send({
      from: accounts[0],
      gas: '1000000'
    });
    const project = await campaign.methods.projects(0).call();

    assert.equal('Paint the house', project.description);
  }); // end it

  it('Handles projects', async () => {
    await campaign.methods.contribute()
      .send({
        from: accounts[0], // accounts[0] marked as supporter
        value: web3.utils.toWei('10', 'ether')
      });

    await campaign.methods
      .createProject('project1', web3.utils.toWei('5', 'ether'), accounts[1])
      .send({
        from: accounts[0],
        gas: '1000000'
      });

    await campaign.methods.approveProject(0)
      .send({
        from: accounts[0],
        gas: '1000000'
      });

    await campaign.methods.finalizeProject(0)
      .send({
        from: accounts[0], // only manager can finalizeProject
        gas: '1000000'
      });

    let balance = await web3.eth.getBalance(accounts[1]); // string
    balance = web3.utils.fromWei(balance, 'ether');
    balance = parseFloat(balance);

    assert(balance > 104); // not exact 105 based on previous tests and gas costs
  }); // end it

}); // end describe
