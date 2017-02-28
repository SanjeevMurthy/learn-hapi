'use strict';

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = new _hapi2.default.Server();

server.connection({
  port: 3000
});

server.ext('onRequest', function (request, reply) {
  console.log('Request received ' + request.path);
  reply.continue();
});

// server.route({
//   path:'/',
//   method:'GET',
//   handler:(request,reply)=>{
//     reply.file('/templates/index.html');
//   }
// });

server.route({
  path: '/',
  method: 'GET',
  handler: { //built-in file handler
    file: 'templates/index.html'
  }
});

// server.route({
//   path:'/hello',
//   method:'GET',
//   handler:function(request,reply){
//     reply("Hello World");
//   }
// });


server.start(function () {
  console.log('Server listening on ' + server.info.uri);
});