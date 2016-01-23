'use strict';

const Hapi = require('hapi');
const fs = require('fs');
const server = new Hapi.Server();

const tlsOptions = {
  tls: {
    ca: fs.readFileSync('/home/kamil/cert/ca-bundle.crt'),
    key: fs.readFileSync('/home/kamil/cert/myserver.key'),
    cert: fs.readFileSync('/home/kamil/cert/domaincert.crt')
  }
};

server.connection({ port: 22935, tls: tlsOptions});

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

server.start(() => {
    console.log('Server running at:', server.info.uri);
});