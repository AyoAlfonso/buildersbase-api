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
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class DeleteRoleRequest {
}
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", Number)
], DeleteRoleRequest.prototype, "groupId", void 0);
exports.DeleteRoleRequest = DeleteRoleRequest;
//# sourceMappingURL=deleteRoleRequest.js.map