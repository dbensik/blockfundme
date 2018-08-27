import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

// export default (props) => {
export default () => {
  return (
    <Menu style={{ marginTop: '20px' }}>
      <Link route="/">
        <a className='item'>BlockFund</a>
      </Link>

      <Menu.Menu position='right'>
        <Link route="/">
          <a className='item'>Campaigns</a>
        </Link>

        <Link route="/campaigns/new">
          <a className='item'>New Campaign</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};
