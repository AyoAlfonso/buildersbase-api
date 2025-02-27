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
class CreatePage {
}
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'title is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreatePage.prototype, "title", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'content is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreatePage.prototype, "content", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", Number)
], CreatePage.prototype, "active", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'metaTagTitle is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreatePage.prototype, "metaTagTitle", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'metaTagContent is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreatePage.prototype, "metaTagContent", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'metaTagKeyword is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreatePage.prototype, "metaTagKeyword", void 0);
exports.CreatePage = CreatePage;
//# sourceMappingURL=createPageRequest.js.map