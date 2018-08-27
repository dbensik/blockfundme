import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { Card, Grid, Button, Form, Message } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Router, Link } from '../../routes';

class ShowCampaign extends Component {
  state = {
    errorMsg: '',
    loadingFlag: false
  };

  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const details = await campaign.methods.getDetails().call();

    return {
      minContribution: details[0],
      balance: details[1],
      numProjects: details[2],
      numSupporters: details[3],
      manager: details[4],
      address: props.query.address
    };
  } // end getInitialProps

  onSubmit = async (event) => {
    event.preventDefault();

    const campaign = Campaign(this.props.address);

    this.setState({ loadingFlag: true, errorMsg: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .kill()
        .call({from: manager});
      Router.pushRoute('/');
    } catch(err){
      this.setState({ errorMsg: err.message })
    }

    this.setState({ loadingFlag: false });

  };

    renderCards() {
      const {
        minContribution,
        balance,
        numProjects,
        numSupporters,
        manager
      } = this.props;

      const items = [
        {
          header: manager,
          meta: 'Manager Address',
          description: 'The manager created this campaign and can create projects to fund',
          style: { overflowWrap: 'break-word' }
        },
        {
          header: minContribution,
          meta: 'Minimum Contribution (wei)',
          description: 'Contribution must be at least this much wei to become a supporter',
          style: { overflowWrap: 'break-word' }
        },
        {
          header: numProjects,
          meta: 'Number of Projects',
          description: 'A project will withdraw funds from the campaign, if approved, for a specific purpose',
          style: { overflowWrap: 'break-word' }
        },
        {
          header: numSupporters,
          meta: 'Number of Supporters',
          description: 'Number of supporters of the project',
          style: { overflowWrap: 'break-word' }
        },
        {
          header: web3.utils.fromWei(balance, 'ether'),
          meta: 'Campaign Balance',
          description: 'This is the amount remaining to fund projects',
          style: { overflowWrap: 'break-word' }
        }
      ];

      return <Card.Group items={items}/>;
    } // end renderCards

  render() {
    return (
      <Layout>
        <h2>Show Campaigns</h2>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              {this.renderCards()}
            </Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/projects`}>
                <a>
                  <Button primary>View Campaign Projects</Button>
                </a>
              </Link>

            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Form onSubmit={this.onSubmit} error={!!this.state.errorMsg}>
                <Message error header="Oops! Something went wrong..." content={this.state.errorMsg} />
                <Button primary loading={this.state.loadingFlag}>Cancel this Campaign</Button>
              </Form>
            </Grid.Column>
          </Grid.Row>

        </Grid>


      </Layout>
    );
  } // end render
} // end class

export default ShowCampaign;
