var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'production';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'govhack2015-api'
    },
    port: 3000,
    db: 'mongodb://mongo/cordial-api-development'
  },

   local: {
      root: rootPath,
      app: {
          name: 'govhack2015-api'
      },
      port: 3000,
      db: 'mongodb://localhost/cordial-api-development'
    },

  test: {
    root: rootPath,
    app: {
      name: 'govhack2015-api'
    },
    port: 3000,
    db: 'mongodb://mongo/cordial-api-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'govhack2015-api'
    },
    port: 3000,
    db: 'mongodb://mongo/cordial-api-production'
  }
};

module.exports = config[env];
