'use strict';

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _knex = require('./knex.js');

var _knex2 = _interopRequireDefault(_knex);

var _routes = require('./routes/routes.js');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = new _hapi2.default.Server();

server.connection({
  port: 8000
});

// .register(...) registers a module within the instance of the API. The callback is then used to tell that the loaded module will be used as an authentication strategy.
server.register(require('hapi-auth-jwt'), function (err) {
  server.auth.strategy('token', 'jwt', {
    key: 'vZiYpmTzqXMp8PpYXKwqc9ShQ1UhyAfy',
    verifyOptions: {
      algorithms: ['HS256']
    }
  });

  _routes2.default.forEach(function (route) {
    console.log('attaching ' + route.path);
    server.route(route);
  });
});

server.start(function (err) {
  if (err) {
    console.error("Erro!!!");
    console.console.error(err);
  }
  console.log('server started at ' + server.info.uri);
});