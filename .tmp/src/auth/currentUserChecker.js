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
const tslib_1 = require("tslib");
function currentUserChecker(connection) {
    return function innerCurrentUserChecker(action) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return action.request.user;
        });
    };
}
exports.currentUserChecker = currentUserChecker;
//# sourceMappingURL=currentUserChecker.js.map