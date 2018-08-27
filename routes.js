const routes = require('next-routes')();

routes
  .add('/campaigns/new', '/campaigns/new')
  .add('/campaigns/:address', '/campaigns/show') // : address is wildcard
  .add('/campaigns/:address/projects', '/campaigns/projects/index')
  .add('/campaigns/:address/projects/new', '/campaigns/projects/new');

module.exports = routes;
