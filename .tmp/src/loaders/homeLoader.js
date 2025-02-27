"use strict";
/*
 * Buildersbase API
 * version 2.0.0
 * http://api.buildersbase.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("../env");
exports.homeLoader = (settings) => {
    if (settings) {
        const expressApp = settings.getData('express_app');
        expressApp.get(env_1.env.app.routePrefix, (req, res) => {
            return res.json({
                name: env_1.env.app.name,
                version: env_1.env.app.version,
                description: env_1.env.app.description,
            });
        });
    }
};
//# sourceMappingURL=homeLoader.js.map