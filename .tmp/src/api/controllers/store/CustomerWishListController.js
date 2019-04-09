"use strict";
/*
 * spurtcommerce API
 * version 2.0.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const class_transformer_1 = require("class-transformer");
const customerWishlist_1 = require("../../models/customerWishlist");
const CustomerWishlistService_1 = require("../../services/CustomerWishlistService");
const ProductImageService_1 = require("../../services/ProductImageService");
let CustomerController = class CustomerController {
    constructor(customerWishlistService, productImageService) {
        this.customerWishlistService = customerWishlistService;
        this.productImageService = productImageService;
    }
    // Add Product To Wishlist API
    /**
     * @api {post} /api/customer/add-product-to-wishlist Add Product To Wishlist
     * @apiGroup Store wishlist
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} productId Product Id
     * @apiParamExample {json} Input
     * {
     *      "productId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Thank you product added to the wishlist successfully..!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/add-product-to-wishlist
     * @apiErrorExample {json} Add Product To Wishlist error
     * HTTP/1.1 500 Internal Server Error
     */
    // Add Product To Wishlist Function
    addProductToWishlist(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const data = yield this.customerWishlistService.findOne({ where: { productId: request.body.productId, customerId: request.user.id } });
            if (data) {
                const errorResponse = {
                    status: 1,
                    message: 'Already added this product....!',
                };
                return response.status(200).send(errorResponse);
            }
            const newProduct = new customerWishlist_1.CustomerWishlist();
            newProduct.customerId = request.user.id;
            newProduct.productId = request.body.productId;
            newProduct.isActive = 1;
            const resultData = yield this.customerWishlistService.create(newProduct);
            const successResponse = {
                status: 1,
                message: 'Thank you product added to the wishlist successfully..!',
                data: class_transformer_1.classToPlain(resultData),
            };
            return response.status(200).send(successResponse);
        });
    }
    // Wish List Product Delete API
    /**
     * @api {delete} /api/customer/wishlist-product-delete/:id  Delete Product From Wishlist
     * @apiGroup Store wishlist
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "wishlistProductId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Thank you deleted the product from wishlist successfully..!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/wishlist-product-delete/:id
     * @apiErrorExample {json} Wishlist Product Delete error
     * HTTP/1.1 500 Internal Server Error
     */
    // Add Product Wishlist Function
    wishlistProductDelete(wishlistId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.customerWishlistService.delete(wishlistId);
            const successResponse = {
                status: 1,
                message: 'Thank you deleted the product from wishlist successfully..!',
            };
            return response.status(200).send(successResponse);
        });
    }
    // Wish List Product List API
    /**
     * @api {get} /api/customer/wishlist-product-list WishList Product List
     * @apiGroup Store wishlist
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully show the wishlist Product List",
     *      "status": "1",
     *      "data": "{}"
     * }
     * @apiSampleRequest /api/customer/wishlist-product-list
     * @apiErrorExample {json} Wishlist Product List error
     * HTTP/1.1 500 Internal Server Error
     */
    // View Product Wishlist Function
    wishlistProductlist(limit, offset, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const relation = ['product'];
            const select = ['wishlistProductId'];
            const whereConditions = [
                {
                    customerId: request.user.id,
                },
            ];
            const wishlistData = yield this.customerWishlistService.list(limit, offset, relation, select, whereConditions, count);
            if (count) {
                const Response = {
                    status: 1,
                    message: 'Successfully get count',
                    data: wishlistData,
                };
                return response.status(200).send(Response);
            }
            const promises = wishlistData.map((results) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                console.log(results.product);
                console.log(results.product.productId);
                const Id = results.product.productId;
                const Image = yield this.productImageService.findOne({ where: { productId: Id } });
                results.productImage = Image;
                return results;
            }));
            const result = yield Promise.all(promises);
            const successResponse = {
                status: 1,
                message: 'Successfully show the wishlist Product List',
                data: class_transformer_1.classToPlain(result),
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Post('/add-product-to-wishlist'),
    routing_controllers_1.Authorized('customer'),
    tslib_1.__param(0, routing_controllers_1.Req()), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "addProductToWishlist", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/wishlist-product-delete/:id'),
    routing_controllers_1.Authorized('customer'),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "wishlistProductDelete", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/wishlist-product-list'),
    routing_controllers_1.Authorized('customer'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('count')), tslib_1.__param(3, routing_controllers_1.Req()), tslib_1.__param(4, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "wishlistProductlist", null);
CustomerController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/customer'),
    tslib_1.__metadata("design:paramtypes", [CustomerWishlistService_1.CustomerWishlistService,
        ProductImageService_1.ProductImageService])
], CustomerController);
exports.CustomerController = CustomerController;
//# sourceMappingURL=CustomerWishListController.js.map