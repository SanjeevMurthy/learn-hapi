'use strict';
const Hapi = require('hapi');
const Blipp = require('blipp');
const Hello = require('./plugins/hello.js');
const HapiRedis=require('./plugins/hapi-redis.js');
const UserStore=require('./plugins/userStore.js');
const server = new Hapi.Server();
server.connection({ port: 5000, host: '127.0.0.1' });

server.register([
        {register : Hello, options : {} },
        {register : HapiRedis , options :{}},
        UserStore,
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

// 'use strict';
//
// const Hapi = require('hapi');
// const Blipp = require('blipp');
// const Hello = require('./plugins/hello.js');
//
// const server = new Hapi.Server();
//
// server.connection({ port: 5000, host: '127.0.0.1' });
//
// server.route({
//   path:'/home',
//   method:'GET',
//   handler:function(request,reply){
//     return reply("Home !!");
//   }
// });
//
// server.register([
// 	{ register: Hello, options: {} },
//     Blipp
// ], (err) => {
//     if(err){
//       console.log(err);
//     }
//     server.start((err) => {
//
//         console.log(`Server running at ${server.info.uri}`);
//     });
// });
