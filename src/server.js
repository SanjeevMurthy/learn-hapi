import Hapi from 'hapi';
import Knex from './knex.js';

const server=new Hapi.Server();

server.connection({
  port:8000
});

server.route({
  path:'/hello',
  method:'GET',
  handler:(request,reply)=>{
    reply('Hello !!');
  }
});

server.route( {

    path: '/birds',
    method: 'GET',
    handler: ( request, reply ) => {
      const getBirds=Knex('birds').where({
        isPublic:true
      }).select('name','species','picture_url').then((results)=>{
        if(!results || results.length === 0){
          reply({
            error:true,
            errMessage:'No birds Found'
          });
        }

        reply({
          dataCount:results.length,
          data:results
        });
      }).catch((err)=>{
        reply('server-side error');
      });
    }

} );

server.route( {

    path: '/auth',
    method: 'POST',
    handler: ( request, reply ) => {

        // This is a ES6 standard
        const { username, password } = request.payload;

        const getOperation = Knex( 'users' ).where( {

            // Equiv. to `username: username`
            username,

        } ).select( 'guid', 'password' ).then( ( results ) => {

        } ).catch( ( err ) => {

            reply( 'server-side error' );

        } );

    }

} );

// .register(...) registers a module within the instance of the API. The callback is then used to tell that the loaded module will be used as an authentication strategy.
server.register( require( 'hapi-auth-jwt' ), ( err ) => {
    server.auth.strategy( 'token', 'jwt', {

        key: 'vZiYpmTzqXMp8PpYXKwqc9ShQ1UhyAfy',

        verifyOptions: {
            algorithms: [ 'HS256' ],
        }

    } );

} );

server.start((err)=>{
  if(err){
    console.error("Erro!!!");
    console.console.error(err);
  }
  console.log(`server started at ${server.info.uri}`);
});
