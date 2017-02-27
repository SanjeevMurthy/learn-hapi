import Hapi from 'hapi';
import Knex from './knex.js';
import routes from './routes/routes.js'

const server=new Hapi.Server();

server.connection({
  port:8000
});



// .register(...) registers a module within the instance of the API. The callback is then used to tell that the loaded module will be used as an authentication strategy.
server.register( require( 'hapi-auth-jwt' ), ( err ) => {
    server.auth.strategy( 'token', 'jwt', {
        key: 'vZiYpmTzqXMp8PpYXKwqc9ShQ1UhyAfy',
        verifyOptions: {
            algorithms: [ 'HS256' ],
        }
    } );

    routes.forEach( ( route ) => {
       console.log( `attaching ${ route.path }` );
       server.route( route );
   } );

} );

server.start((err)=>{
  if(err){
    console.error("Erro!!!");
    console.console.error(err);
  }
  console.log(`server started at ${server.info.uri}`);
});
