import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react'
import factory from '../../ethereum/factory'; // import instance of contract
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';  // Link allows import of anchor tags

class NewCampaign extends Component {
  state = {
    minContribution: '', // use string for user input
    errorMsg: '',
    loadingFlag: false
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loadingFlag: true, errorMsg: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minContribution)
        .send({
          // no need to set gas amount when calling in the browser
          from: accounts[0]
        });
      Router.pushRoute('/');
    } catch(err){
      this.setState({ errorMsg: err.message })
    }

    this.setState({ loadingFlag: false });

  };

  render() {
    return (
      <Layout>
        <h3>Create a New Campaign</h3>
        <Form onSubmit={ this.onSubmit } error={!!this.state.errorMsg}>
        {/* must add error prop for semantic ui
          !! turns this into bool */}
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label = 'wei'
              labelPosition = 'right'
              value = {this.state.minContribution}
              onChange = {event => this.setState({minContribution: event.target.value})}
            />
          </Form.Field>

          <Message
            error
            header='Oops! Something went wrong...'
            content={this.state.errorMsg}
          />
          <Button primary type='submit' loading={this.state.loadingFlag}>Contribute</Button>
        </Form>
      </Layout>
    );
  }
}

export default NewCampaign;
