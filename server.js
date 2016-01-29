'use strict';

const Hapi = require('hapi');
const Blankie = require('blankie');
const Scooter = require('scooter');
const server = new Hapi.Server();

server.connection({ port: 22935});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Coming soon....... :)');
    }
})

server.register(require('inert'), (err) => {
    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
            path: './',
            listing: true
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/experiment/{param*}',
        handler: {
            directory: {
            path: 'experiment',
            listing: true
            }
        }
    });
});

server.register([Scooter, {
    register: Blankie,
    options: {
        // examples of CSP directives that affect the entire server
        // objectSrc: ['unsafe-inline', 'unsafe-eval']
    }
}], function (err) {

    if (err) {
        throw err;
    }

    server.start(() => {
        console.log('Server running at:', server.info.uri);
    });
});