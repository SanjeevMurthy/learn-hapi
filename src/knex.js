export default require( 'knex' )( {

    client: 'mysql',
    connection: {

        host: 'localhost',

        user: 'birdDB',
        password: 'password',

        database: 'birdbase',
        charset: 'utf8',

    }

} );
