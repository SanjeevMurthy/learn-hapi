import Hapi from 'hapi';
import Blipp from 'blipp';

const server=new Hapi.Server();

server.connection({
  port:'5000',
  host:'127.0.0.1'
});

server.route({
  path:'/',
  method:'GET',
  handler:(request,reply)=>{
    return reply(server.info);
  }
});

server.register(Blipp,(err)=>{
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
