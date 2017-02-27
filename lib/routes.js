'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _knex = require('./knex');

var _knex2 = _interopRequireDefault(_knex);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _guid = require('guid');

var _guid2 = _interopRequireDefault(_guid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = [{
    path: '/hello',
    method: 'GET',
    handler: function handler(request, reply) {
        reply('Hello !!');
    }
}, {

    path: '/birds',
    method: 'GET',
    handler: function handler(request, reply) {
        var getBirds = (0, _knex2.default)('birds').where({
            isPublic: true
        }).select('name', 'species', 'picture_url').then(function (results) {
            if (!results || results.length === 0) {
                reply({
                    error: true,
                    errMessage: 'No birds Found'
                });
            }

            reply({
                dataCount: results.length,
                data: results
            });
        }).catch(function (err) {
            reply('server-side error');
        });
    }

}, {

    path: '/auth',
    method: 'POST',
    handler: function handler(request, reply) {

        // This is a ES6 standard
        var _request$payload = request.payload,
            username = _request$payload.username,
            password = _request$payload.password;

        var getOperation = (0, _knex2.default)('users').where({
            // Equiv. to `username: username`
            username: username
        }).select('guid', 'password').then(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 1),
                user = _ref2[0];

            if (!user) {
                reply({
                    error: true,
                    errMessage: 'the specified user was not found'
                });
            }

            if (user.password === password) {
                var token = _jsonwebtoken2.default.sign({
                    // You can have anything you want here. ANYTHING. As we'll see in a bit, this decoded token is passed onto a request handler.
                    username: username,
                    scope: user.guid

                }, 'vZiYpmTzqXMp8PpYXKwqc9ShQ1UhyAfy', {
                    algorithm: 'HS256',
                    expiresIn: '1h'
                });

                reply({
                    token: token,
                    scope: user.guid
                });
            } else {
                reply('incorrect password');
            }
        }).catch(function (err) {
            reply('server-side error');
        });
    }

}, {

    path: '/birds',
    method: 'POST',
    config: {
        auth: {
            strategy: 'token'
        }
    },
    handler: function handler(request, reply) {
        var bird = request.payload.bird;

        var guid = guid.v4();

        var insertOperation = (0, _knex2.default)('birds').insert({

            owner: request.auth.credentials.scope,
            name: bird.name,
            species: bird.species,
            picture_url: bird.picture_url,
            guid: guid

        }).then(function (res) {

            reply({

                data: guid,
                message: 'successfully created bird'

            });
        }).catch(function (err) {

            reply('server-side error');
        });
    }

}];

exports.default = routes;