'use strict';

const Hapi = require('hapi');
const fs = require('fs');
const server = new Hapi.Server();

server.connection({ port: 22935,
                    tls: {
                        key: fs.readFileSync('/home/kamil/kamiljozwiak.main/certs/privkey.pem'),
                        cert: fs.readFileSync('/home/kamil/kamiljozwiak.main/certs/fullchain.pem'),
                        ca: fs.readFileSync('/home/kamil/kamiljozwiak.main/certs/chain.pem')
                    }

});

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