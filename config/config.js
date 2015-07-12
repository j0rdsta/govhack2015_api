var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'govhack2015-api'
    },
    port: 3000,
    db: 'mongodb://localhost/govhack2015-api-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'govhack2015-api'
    },
    port: 3000,
    db: 'mongodb://localhost/govhack2015-api-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'govhack2015-api'
    },
    port: 3000,
    db: 'mongodb://localhost/govhack2015-api-production'
  }
};

module.exports = config[env];
