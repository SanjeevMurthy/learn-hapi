const Uuid = require('uuid');
const Boom = require('boom');


exports.register=function(server,options,next){
  let store;
  server.dependency('hapi-redis',(server,after)=>{
    store=server.plugins['hapi-redis'].db;
    return after();
  })

  const getUser = function(userid,callback){
    console.log("Calling GET user");
    store.get("key",(err,response)=>{
      if(err){
        console.log(err);
      }
      console.log("response : ",response);
      callback(null,response);
    });
  };

  const createUser = function(userDetails,callback){
    console.log("Called createUser");
    const userId=Uuid.v4();
    const user ={
      id:userId,
      details:userDetails
    };
    store.set(userId,user,(err)=>{
      if(err){
        console.log(err);
      }
      callback(null,user);
    });
  };

  server.route([
    {
      path:'/user/{userId}',
      method:'GET',
      config:{
        description:'Retrive a user by userId',
        handler:function(request,reply){
          console.log("GET USER");
          const userId=request.params.userId;
          getUser(userId,(err,user)=>{
            if(err){
              console.log("Error !!");
              return reply(Boom.notFound(err));
            }
            return reply(user);
          });
        }
      }
    },
    {
      path:'/user',
      method:'POST',
      config:{
        description:'Create a User',
        handler:function(request,reply){
          console.log("POST request");
          const userDetails=request.payload;
          console.log("USER Details : ",userDetails);
          createUser(userDetails,(err,user)=>{
            if(err){
              return reply(Boom.badRequest(err));
            }
            return reply(user);
          });
        }
      }
    }
  ]);

  server.expose({
    getUser:getUser,
    createUser:createUser
  });

  return next();
}

exports.register.attributes={
  name:'userStore'
};
