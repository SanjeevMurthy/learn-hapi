const Redis=require('ioredis');

exports.register=function(server,options,next){
  const redis= new Redis({
    port:7001,
    host:'127.0.0.1',
    family:4
  });
  
  server.expose({db:redis});
  next();
}

exports.register.attributes={
  name:'hapi-redis'
}
