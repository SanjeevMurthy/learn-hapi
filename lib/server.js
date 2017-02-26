'use strict';

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _knex = require('./knex.js');

var _knex2 = _interopRequireDefault(_knex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = new _hapi2.default.Server();

server.connection({
  port: 8000
});

server.route({
  path: '/hello',
  method: 'GET',
  handler: function handler(request, reply) {
    reply('Hello !!');
  }
});

server.route({

  path: '/birds',
  method: 'GET',
  handler: function handler(request, reply) {
    var getBirds = (0, _knex2.default)('birds').where({
      isPublic: true
    }).select('name', 'species', 'picture_url').then(function (results) {
      if (!results || results.length === 0) {
        reply({
          error: true,
          errMessage: 'No birds Found'
        });
      }

      reply({
        dataCount: results.length,
        data: results
      });
    }).catch(function (err) {
      reply('server-side error');
    });
  }

});

// .register(...) registers a module within the instance of the API. The callback is then used to tell that the loaded module will be used as an authentication strategy.
server.register(require('hapi-auth-jwt'), function (err) {
  server.auth.strategy('token', 'jwt', {

    key: 'vZiYpmTzqXMp8PpYXKwqc9ShQ1UhyAfy',

    verifyOptions: {
      algorithms: ['HS256']
    }

  });
});

server.start(function (err) {
  if (err) {
    console.error("Erro!!!");
    console.console.error(err);
  }
  console.log('server started at ' + server.info.uri);
});