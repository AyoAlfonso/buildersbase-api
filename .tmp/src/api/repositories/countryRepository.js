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
const country_1 = require("../models/country");
let CountryRepository = class CountryRepository extends typeorm_1.Repository {
};
CountryRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(country_1.Country)
], CountryRepository);
exports.CountryRepository = CountryRepository;
//# sourceMappingURL=countryRepository.js.map