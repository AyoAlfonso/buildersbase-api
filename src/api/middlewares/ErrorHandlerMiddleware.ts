/*
 * Buildersbase API
 * version 2.0.0
 * http://api.buildersbase.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import * as express from 'express';
import { ExpressErrorMiddlewareInterface, HttpError, Middleware } from 'routing-controllers';
import { ValidationError } from 'class-validator';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { env } from '../../env';

@Middleware({ type: 'after' })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {

    public isProduction = env.isProduction;

    constructor(
        @Logger(__filename) private log: LoggerInterface
    ) { }

    /**
     * Error handler - sets response code and sends json with error message.
     * Handle: standard node error, HttpError, ValidationError and string.
     *
     * @param {any} error An throwed object (error)
     * @param {express.Request} req The Express request object
     * @param {express.Response} res The Express response object
     * @param {express.NextFunction} next The next Express middleware function
     */
    public error(error: any, _req: express.Request, res: express.Response, _next: express.NextFunction): void {
        const responseObject = {} as any;

        // if its an array of ValidationError
        console.log(error.errors);
        // console.log(Array.isArray(error));
        if (error && Array.isArray(error.errors) && error.errors.every((element) => element instanceof ValidationError)) {
            console.log('Inside');
            responseObject.message = "You have an error in your request's body. Check 'errors' field for more details!";
            // responseObject.errors = error;
            responseObject.status = 0;
            responseObject.data = {};
            responseObject.data.message = [];
            let messageError;
            error.errors.forEach((element: ValidationError) => {
                Object.keys(element.constraints).forEach((type) => {
                    responseObject.data.message.push(`property ${element.constraints[type]}`);
                    messageError = `${element.constraints[type]}`;
                });
            });
         res.status(201).json({ message: messageError});
         return;
        } else {
            // set http status
            if (error instanceof HttpError && error.httpCode) {
                console.log('Https Error' + error);
                res.status(error.httpCode);   return;
            } else {
                res.status(203);
                return;
            }

            if (error instanceof Error) {
                const developmentMode: boolean = !this.isProduction;

                // set response error fields
                if (error.name && (developmentMode || error.message)) { // show name only if in development mode and if error message exist too
                    responseObject.name = error.name;
                }
                switch (error.name) {
                    case 'AuthorizationRequiredError':
                        responseObject.message = 'Unauthorized';
                        break;
                    default:
                        responseObject.message = error.message;
                        break;
                }

                if (error.stack && developmentMode) {
                    responseObject.stack = error.stack;
                }
            } else if (typeof error === 'string') {
                responseObject.message = error;
            }
        }

        if (this.isProduction) {
            console.log('Https Production Error' + error);
            this.log.error(error.name, error.message);
        } else {
            console.log('Https Development Error' + error);
            this.log.error(error.name, error.stack);
            res.status(201).json({ message: error.name});
            return;
        }
        // send json only with error
        // res.json(responseObject);
    }

}
