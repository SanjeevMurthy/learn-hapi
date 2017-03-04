import Hapi from 'hapi';
import Blipp from 'blipp';
import Joi from 'joi';
import Inert from 'inert';
import Path from 'path';
import Vision from 'vision';

const server=new Hapi.Server();

server.connection({
  port:'5000',
  host:'127.0.0.1'
});

server.route({
  path:'/request',
  method:'GET',
  handler:function(request,reply){
    server.req=request;
    let response={
      id:request.id,
      method:request.method,
      mime:request.mime,
      orig:request.orig,
      params:request.params,
      headers:request.headers,
      auth:request.auth,
      info:request.info,
      app:request.app
    }
    console.log(response);
    //return reply(request.raw.headers);
    return reply(response,null);
  }
});

server.route({
  path:'/server',
  method:'GET',
  handler:function(request,reply){
    server.req=request;
    console.log(request);
    return reply(server.info);
  }
});


server.route({
  path:'/hello/{name}',
  method:'GET',
  config:{
    description:"Return an Object with Hello message",
    validate:{
      params:{
        name:Joi.string().min(3).required()
      }
    },
    pre:[],
    handler:function(request,reply){
      const name=request.params.name;
      reply({message:`Hello ${name} !!`});
    },
    cache:{
      expiresIn:3600000
    }
  }
});

server.route({
  method: '*',                                          // [1]
  path: '/{p*}',                          // [2]
  handler: function (request, reply) {
    return reply('The page was not found').code(404);   // [3]
  }
});

const hello = function (name) {
  return this.response({ hello: name });
}
server.decorate('reply', 'hello', hello);
server.route({
  method: 'GET',
  path: '/customreply/{name}',
  handler: function (request, reply) {
    return reply.hello(request.params.name);
  }
});


// Defines new handler for routes on this server
server.handler('hello', (route, options) => {
  return function (request, reply) {
    const hello = options.customHello || 'Hello';
    const name = request.params.name;
    return reply(`${hello} ${name}`);
  }
});

server.route({
  method: 'GET',
  path: '/customhello/{name}',
  handler: {
    hello: {
      customHello: 'Welcome'
    }
  }
});

server.register(Inert,(err)=>{
  if(err){
    throw err;
  }

  server.route({
    path:'/staticfile/{param*}',
    method:'GET',
    handler:{
      directory:{
        path:Path.join(__dirname,'public'),
        listing:true
      }
    }
  });

});

server.register(Vision, (err) => {                  // [1]
  server.views({                                    // [2]
    engines: {                                      // [2]
      handlebars: {                                 // [2]
        module: require('handlebars')               // [2]
      }                                             // [2]
    },                                              // [2]
    relativeTo: __dirname,                          // [2]
    path: 'templates'                               // [2]
  });                                               // [2]
  server.route({
    method: 'GET',
    path: '/index',
    handler: function (request, reply) {
      let context = { title: 'Hapi Templates!' };
      return reply.view('index',context);          // [3]
    }
  });
});

server.register([Blipp,Inert],(err)=>{
  if(err){
    throw err;
  }

  server.start((err)=>{
    if(err){
      throw(err);
    }
    console.log(`Server running at ${server.info.uri}`);
  });
});
