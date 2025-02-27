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
const Address_1 = require("../models/Address");
let AddressRepository = class AddressRepository extends typeorm_1.Repository {
};
AddressRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(Address_1.Address)
], AddressRepository);
exports.AddressRepository = AddressRepository;
//# sourceMappingURL=AddressRepository.js.map