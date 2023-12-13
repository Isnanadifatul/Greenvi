'use strict';

const routes = require('./src/routes');
const Hapi = require('@hapi/hapi');
const inert = require('@hapi/inert');
const path = require('path');
const Boom = require('@hapi/boom');
const connection = require('./db-config');
const { loginHandler } = require('./src/handlers-login');



const init = async () => {

    const server = Hapi.Server({
        host: 'localhost',
        port: 5002,
        routes: {
            cors: {
                origin: ['*'],
            }
        },
    });

    server.state('userSession', {
        ttl: 24 * 60 * 60 * 1000,
        encoding: 'base64json',
        isSecure: false,
        isHttpOnly: true,
        clearInvalid: false,
        strictHeader: true,
    });

    await server.register([{
        plugin: require("hapi-geo-locate"),
        options: {
            enabledByDefault: true
        }
    },
    {
        plugin: inert
    },
    {
        plugin: require('@hapi/vision')
    },
    {
        plugin: require('@hapi/cookie')
    },
    ]);

    // Konfigurasi rendering view dengan handlebars (contoh)
    server.views({
        engines: {
            html: require('handlebars'),
        },
        relativeTo: __dirname,
        path: 'views', // Pastikan ini sesuai dengan struktur folder proyek Anda
    });

    server.route(routes);

    await server.start();
    console.log(`Server started on: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();