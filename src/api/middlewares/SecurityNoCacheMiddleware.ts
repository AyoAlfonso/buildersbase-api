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
import * as helmet from 'helmet';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';

@Middleware({ type: 'before' })
export class SecurityNoCacheMiddleware implements ExpressMiddlewareInterface {

    public use(req: express.Request, res: express.Response, next: express.NextFunction): any {
        return helmet.noCache()(req, res, next);
    }

}
