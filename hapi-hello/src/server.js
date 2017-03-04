'use strict';
const Hapi = require('hapi');
const Blipp = require('blipp');
const Hello = require('./plugins/hello.js');
const server = new Hapi.Server();
server.connection({ port: 1337, host: '127.0.0.1' });

server.register([
        {register : Hello, options : {} },
        Blipp
      ],{
        routes:{
          prefix:'/v1'
        }
      },(err) => {
  server.start((err) => {
    console.log(`Server running at ${server.info.uri}`);
  });
});
