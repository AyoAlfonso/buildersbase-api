/*
 * Buildersbase API
 * version 2.0.0
 * http://api.buildersbase.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Application } from 'express';
import express from 'express';
// import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { useExpressServer } from 'routing-controllers';

import { authorizationChecker } from '../auth/authorizationChecker';
import { currentUserChecker } from '../auth/currentUserChecker';
import { env } from '../env';

export const expressLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {
        const connection = settings.getData('connection');
        // const options:cors.CorsOptions = {
        //     allowedHeaders: ["Origin", "X-Requested-With", 'Content-Type', 'Accept', 'X-Access-Token'],
        //     credentials: true,
        //     methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
        //     origin: '*',
        //     preflightContinue: false
        //   };

        /**
         * We create a new express server instance.
         * We could have also use useExpressServer here to attach controllers to an existing express instance.
         */
        const app = express();
        // app.use('*', (req, res, next) => {
        //     // console.log( req.headers.origin[0]);
        //     res.header('Access-Control-Allow-Origin', '*');
        //     res.header('Access-Control-Allow-Headers', 'X-Requested-With');
        //     res.header('Access-Control-Allow-Headers', 'Content-Type');
        //     res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
        //     next();
        // });
        // app.use(cors());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json({limit: '50mb'}));
        const expressApp: Application = useExpressServer(app, {
            cors: true,
            classTransformer: true,
            routePrefix: env.app.routePrefix,
            defaultErrorHandler: false,
            /**
             * We can add options about how routing-controllers should configure itself.
             * Here we specify what controllers should be registered in our express server.
             */
            controllers: env.app.dirs.controllers,
            middlewares: env.app.dirs.middlewares,
            interceptors: env.app.dirs.interceptors,

            /**
             * Authorization features
             */
            authorizationChecker: authorizationChecker(connection),
            currentUserChecker: currentUserChecker(connection),
        });

        // // parse application/x-www-form-urlencoded
        // expressApp.use(bodyParser.urlencoded({extended: true}));
        // expressApp.use(bodyParser.json({limit: '50mb'}));

        // Run application to listen on given port
        if (!env.isTest) {
            const server = expressApp.listen(env.app.port);
            settings.setData('express_server', server);
        }

        // Here we can set the data for other loaders
        settings.setData('express_app', expressApp);
    }
};
