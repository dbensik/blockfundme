import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

class ProjectRow extends Component {

  onApprove = async () => {
    const campaign = Campaign(this.props.address);

    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveProject(this.props.id).send({
      from: accounts[0]
    });
  };

  onFinalize = async () => {
    const campaign = Campaign(this.props.address);

    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeProject(this.props.id).send({
      from: accounts[0]
    });
  };

  render() {
    const { Row, Cell } = Table;
    const { id, project, numSupporters } = this.props;
    const readyToFinalize = project.supporterCount > numSupporters / 2;

    return (
      <Row
        disabled={project.complete}
        positive={readyToFinalize && !project.complete}
      >
        <Cell>{id}</Cell>
        <Cell>{project.description}</Cell>
        <Cell>{web3.utils.fromWei(project.value, 'ether')}</Cell>
        <Cell>{project.recipient}</Cell>
        <Cell>
          {project.supporterCount}/{numSupporters}
        </Cell>
        <Cell>
          {project.complete ? null : (
            <Button color="green" basic onClick={this.onApprove}>
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {project.complete ? null : (
            <Button color="teal" basic onClick={this.onFinalize}>
              Finalize
            </Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default ProjectRow;
