exports.register = function(server,options,next){
  // server.dependency('database',(server,after)=>{
  //   //can do some dependency logic here
  //   after();
  // });

  const getHello=function(name){
    const target=name || 'World';
    return `Hello ${target}`;
  };

  server.expose({getHello:getHello});

  server.route({
    method: 'GET',
    path: '/hello/{name}',
    handler: function (request, reply) {

      const message=getHello(request.params.name);
      console.log(message);
      return reply(message);
    }
  });
  next();
}

exports.register.attributes={
  name:'hello'
}
