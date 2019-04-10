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
const typeorm_1 = require("typeorm");
const orderStatus_1 = require("../models/orderStatus");
let OrderStatusRepository = class OrderStatusRepository extends typeorm_1.Repository {
};
OrderStatusRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(orderStatus_1.OrderStatus)
], OrderStatusRepository);
exports.OrderStatusRepository = OrderStatusRepository;
//# sourceMappingURL=orderStatusRepository.js.map