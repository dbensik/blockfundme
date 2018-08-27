import React, { Component } from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';

// class-based component replaces functional component
class CampaignIndex extends Component {
  // getInitialProps is next.js method
  // goal is to get initial data without having to render component
  static async getInitialProps() { // static defines class function
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return { campaigns: campaigns };
  }


  renderCampaigns() {

    const items = this.props.campaigns.map(address => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true
      };
    });

    return <Card.Group items={items} />
  }

  render() {
    return (
      /* everything in Layout will get passed to Layout as property children */
      <Layout>
        <div>
          <h3>Open Campaigns</h3>
          <h4>BlockFuneMe is an experimental Ethereum dApp deployed on the Rinkeby test network.</h4>
          


          <Link route='/campaigns/new'>
            <a>
              <Button
                content="Create New Campaign"
                icon="add"
                primary
                floated="right"
              />
            </a>
          </Link>
          { this.renderCampaigns() }
        </div>
      </Layout>
    )
  }
} // end class

// next.js expects export
export default CampaignIndex;
