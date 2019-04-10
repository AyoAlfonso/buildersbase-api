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
const ProductToCategory_1 = require("../models/ProductToCategory");
let ProductToCategoryRepository = class ProductToCategoryRepository extends typeorm_1.Repository {
};
ProductToCategoryRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(ProductToCategory_1.ProductToCategory)
], ProductToCategoryRepository);
exports.ProductToCategoryRepository = ProductToCategoryRepository;
//# sourceMappingURL=ProductToCategoryRepository.js.map