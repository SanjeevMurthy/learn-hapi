'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = require('knex')({

    client: 'mysql',
    connection: {

        host: 'localhost',

        user: 'birdDB',
        password: 'password',

        database: 'birdbase',
        charset: 'utf8'

    }

});