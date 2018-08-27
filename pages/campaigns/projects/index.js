import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import ProjectRow from '../../../components/ProjectRow';

class ProjectIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = Campaign(address);
    const numProjects = await campaign.methods.getNumProjects().call();
    const numSupporters = await campaign.methods.supportersCount().call();

    // the following will return an array of structs since Solidity cannot
    const projects = await Promise.all(
      Array(parseInt(numProjects))
        .fill()
        .map((element, index) => {
          return campaign.methods.projects(index).call();
        })
    );

    return { address, projects, numProjects, numSupporters };
  }

  renderProjectRows() {
    return this.props.projects.map((project, index) => {
      return (
        <ProjectRow
          key={index}
          id={index}
          project={project}
          address={this.props.address}
          numSupporters={this.props.numSupporters}
        />
      );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <h3>Projects</h3>
        <Link route={`/campaigns/${this.props.address}/projects/new`}>
          <a>
            <Button primary floated="right" style={{ marginBottom: 20 }}>
              Add New Project
            </Button>
          </a>
        </Link>

        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approvers</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderProjectRows()}</Body>
        </Table>
        <div>Found {this.props.numProjects} projects</div>
      </Layout>
    );
  }
}

export default ProjectIndex;
