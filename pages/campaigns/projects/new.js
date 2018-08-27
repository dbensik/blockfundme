import React, { Component } from 'react';
import { Form, Button, Message, Input, Icon } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';
import Layout from '../../../components/Layout';

class NewProject extends Component {
  state = {
    value: '',
    description: '',
    recipient: '',
    loadingFlag: false,
    errorMsg: ''
  };

  static async getInitialProps(props) {
    const { address } = props.query;

    return { address };
  }

  onSubmit = async event => {
    event.preventDefault();

    const campaign = Campaign(this.props.address);
    const {
      description,
      value,
      recipient
    } = this.state;

    this.setState({ loadingFlag: true, errorMsg: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createProject(description, web3.utils.toWei(value, 'ether'), recipient)
        .send({ from: accounts[0] });

      Router.pushRoute(`/campaigns/${this.props.address}/projects`);
    } catch (err) {
      this.setState({ errorMsg: err.message });
    }

    this.setState({ loadingFlag: false });
  };

  render() {
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/projects`}>
          <a>
          <Button icon labelPosition='left'>
            <Icon name='left arrow' />
            Back
          </Button>
          </a>
        </Link>
        <h2>Create a Project</h2>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMsg}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={event => this.setState({ description: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Value in Ether</label>
            <Input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Recipient</label>
            <Input
              value={this.state.recipient}
              onChange={event => this.setState({ recipient: event.target.value })}
            />
          </Form.Field>

          <Message error header="Oops! Somethign went wrong..." content={this.state.errorMsg} />
          <Button primary loading={this.state.loadingFlag}>
            Create New Project!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default NewProject;
