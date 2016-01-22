'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 8080 });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Coming soon....... :)');
    }
});

server.register(require('inert'), (err) => {
    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/mozilla',
        handler: function (request, reply) {
            reply.file('./mozilla/exp.html');
        }
    });
});

server.start(() => {
    console.log('Server running at:', server.info.uri);
});