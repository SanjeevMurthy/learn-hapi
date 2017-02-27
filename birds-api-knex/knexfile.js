module.exports = {

    development: {

        migrations: { tableName: 'knex_migrations' },
        seeds: { tableName: './seeds' },

        client: 'mysql',
        connection: {

            host: 'localhost',

            user: 'birdDB',
            password: 'password',

            database: 'birdbase',
            charset: 'utf8',

        }

    }

};
