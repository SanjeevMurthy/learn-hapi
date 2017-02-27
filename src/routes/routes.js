
import Knex from '../knex';
import jwt from 'jsonwebtoken';
import guid from 'guid';

const routes=[{
  path:'/hello',
  method:'GET',
  handler:(request,reply)=>{
    reply('Hello !!');
  }
},
{

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

} ,



 {

    path: '/auth',
    method: 'POST',
    handler: ( request, reply ) => {

        // This is a ES6 standard
        const { username, password } = request.payload;
        const getOperation = Knex( 'users' ).where( {
            // Equiv. to `username: username`
            username,
        } ).select( 'guid', 'password' ).then( ( [user] ) => {
          if( !user ) {
            reply( {
                error: true,
                errMessage: 'the specified user was not found'
            } );
          }


          if( user.password === password ) {
              const token = jwt.sign( {
                  // You can have anything you want here. ANYTHING. As we'll see in a bit, this decoded token is passed onto a request handler.
                  username,
                  scope: user.guid,

              }, 'vZiYpmTzqXMp8PpYXKwqc9ShQ1UhyAfy', {
                  algorithm: 'HS256',
                  expiresIn: '1h',
              } );

              reply( {
                  token,
                  scope: user.guid,
              } );
          } else {
              reply( 'incorrect password' );
          }


        } ).catch( ( err ) => {
            reply( 'server-side error' );
        } );

    }

} ,



 {

    path: '/birds',
    method: 'POST',
    config:{
      auth:{
        strategy:'token'
      }
    },
    handler: ( request, reply ) => {

        const { bird } = request.payload;
        const guid = guid.v4();

        const insertOperation = Knex( 'birds' ).insert( {

            owner: request.auth.credentials.scope,
            name: bird.name,
            species: bird.species,
            picture_url: bird.picture_url,
            guid,

        } ).then( ( res ) => {

            reply( {

                data: guid,
                message: 'successfully created bird'

            } );

        } ).catch( ( err ) => {

            reply( 'server-side error' );

        } );

    }

} ];

export default routes;
