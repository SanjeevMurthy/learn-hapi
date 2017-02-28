import Hapi from 'hapi';

const server=new Hapi.Server();

server.connection({
  port:3000
});


server.ext('onRequest',(request,reply)=>{
  console.log(`Request received ${request.path}`);
  reply.continue();
});

// server.route({
//   path:'/',
//   method:'GET',
//   handler:(request,reply)=>{
//     reply.file('/templates/index.html');
//   }
// });

// server.route({
//   path:'/',
//   method:'GET',
//   handler:{ //built-in file handler
//     file:'templates/index.html'
//   }
// });

server.route({
  path:'/hello',
  method:'GET',
  handler:function(request,reply){
    reply("Hello World");
  }
});



server.start(()=>{
  console.log(`Server listening on ${server.info.uri}`);
});
