'use strict';

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = new _hapi2.default.Server();

server.connection({
  port: '5000',
  host: '127.0.0.1'
});

server.route({
  path: '/',
  method: 'GET',
  handler: function handler(request, reply) {
    return reply(server.info);
  }
});

server.start(function (err) {
  if (err) {
    throw err;
  }
  console.log('Server running at ' + server.info.uri);
});