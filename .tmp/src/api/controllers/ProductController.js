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
const ProductService_1 = require("../services/ProductService");
const ProductToCategoryService_1 = require("../services/ProductToCategoryService");
const ProductImageService_1 = require("../services/ProductImageService");
const ProductModel_1 = require("../models/ProductModel");
const class_transformer_1 = require("class-transformer");
const deleteProductRequest_1 = require("./requests/deleteProductRequest");
const createProductRequest_1 = require("./requests/createProductRequest");
const updateProductRequest_1 = require("./requests/updateProductRequest");
const ProductToCategory_1 = require("../models/ProductToCategory");
const ProductImage_1 = require("../models/ProductImage");
const categoryService_1 = require("../services/categoryService");
const OrderProductService_1 = require("../services/OrderProductService");
const OrderService_1 = require("../services/OrderService");
let ProductController = class ProductController {
    constructor(productService, productToCategoryService, productImageService, categoryService, orderProductService, orderService) {
        this.productService = productService;
        this.productToCategoryService = productToCategoryService;
        this.productImageService = productImageService;
        this.categoryService = categoryService;
        this.orderProductService = orderProductService;
        this.orderService = orderService;
    }
    // Product List API
    /**
     * @api {get} /api/product/productlist Product List API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} sku sku
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {Number} price=1/2 if 1->asc 2->desc
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product list",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/product/productlist
     * @apiErrorExample {json} productList error
     * HTTP/1.1 500 Internal Server Error
     */
    productList(limit, offset, keyword, sku, status, price, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(keyword);
            const select = ['productId', 'sku', 'name', 'quantity', 'price', 'image', 'imagePath', 'isActive'];
            const relation = ['productToCategory', 'productImage'];
            const WhereConditions = [
                {
                    name: 'name',
                    op: 'like',
                    value: keyword,
                },
                {
                    name: 'sku',
                    op: 'like',
                    value: sku,
                },
                {
                    name: 'isActive',
                    op: 'like',
                    value: status,
                },
            ];
            const productList = yield this.productService.list(limit, offset, select, relation, WhereConditions, 0, price, count);
            console.log('productList' + productList);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete product list. ',
                data: class_transformer_1.classToPlain(productList),
            };
            return response.status(200).send(successResponse);
        });
    }
    // Delete Product API
    /**
     * @api {delete} /api/product/delete-product/:id Delete Product API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} productId productId
     * @apiParamExample {json} Input
     * {
     *      "productId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Product.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product/delete-product/:id
     * @apiErrorExample {json} productDelete error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteProduct(productDelete, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const product = yield this.productService.findOne({
                where: {
                    productId: productDelete.productId,
                },
            });
            console.log(product);
            if (!product) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid productId',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteProduct = yield this.productService.delete(productDelete.productId);
            console.log('deleteProduct' + deleteProduct);
            if (deleteProduct) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted Product',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to delete product',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Create Product API
    /**
     * @api {post} /api/product/add-product Add Product API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} productName productName
     * @apiParam (Request body) {String} productDescription productDescription
     * @apiParam (Request body) {String} sku stock keeping unit
     * @apiParam (Request body) {String} upc upc
     * @apiParam (Request body) {String} image product Image
     * @apiParam (Request body) {String} metaTagTitle metaTagTitle
     * @apiParam (Request body) {String} categoryId CategoryId
     * @apiParam (Request body) {Number}  model model
     * @apiParam (Request body) {String} location location
     * @apiParam (Request body) {String} price price
     * @apiParam (Request body) {String} minimumQuantity minimumQuantity
     * @apiParam (Request body) {String} quantity quantity
     * @apiParam (Request body) {Number} subtractStock subtractStock
     * @apiParam (Request body) {Number} outOfStockStatus outOfStockStatus
     * @apiParam (Request body) {Number} requiredShipping requiredShipping
     * @apiParam (Request body) {String} dateAvailable dateAvailable
     * @apiParam (Request body) {Number} condition 1->new 2->used
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParamExample {json} Input
     * {
     *      "productName" : "",
     *      "productDescription" : "",
     *      "sku" : "",
     *      "image" : "",
     *      "metaTagTitle" : "",
     *      "categoryId" : "",
     *      "upc" : "",
     *      "model" : "",
     *      "price" : "",
     *      "location" : "",
     *      "minimumQuantity" : "",
     *      "quantity" : "",
     *      "subtractStock" : "",
     *      "outOfStockStatus" : "",
     *      "requiredShipping" : "",
     *      "dateAvailable" : "",
     *      "status" : "",
     *      "outOfStockStatus" : "",
     *      "sortOrder" : "",
     *      "condition" : "",
     *      "image":[
     *      {
     *      "image":""
     *      "containerName":""
     *      }
     *      ]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created new product.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product/add-product
     * @apiErrorExample {json} AddProduct error
     * HTTP/1.1 500 Internal Server Error
     */
    addProduct(product, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(product);
            const newProduct = new ProductModel_1.Product();
            newProduct.name = product.productName;
            newProduct.description = product.productDescription;
            newProduct.sku = product.sku;
            newProduct.upc = product.upc;
            newProduct.location = product.location;
            newProduct.quantity = product.quantity;
            newProduct.price = product.price;
            newProduct.minimumQuantity = product.minimumQuantity;
            newProduct.subtractStock = product.subtractStock;
            newProduct.stockStatusId = product.outOfStockStatus;
            newProduct.shipping = product.requiredShipping;
            newProduct.dateAvailable = product.dateAvailable;
            newProduct.metaTagTitle = product.metaTagTitle;
            newProduct.condition = product.condition;
            newProduct.manufacturerId = product.model;
            newProduct.isActive = product.status;
            newProduct.sortOrder = product.sortOrder;
            newProduct.uniquecode = product.uniquecode;
            const saveProduct = yield this.productService.create(newProduct);
            // save category
            if (product.categoryId) {
                const category = product.categoryId;
                console.log('categoryId ' + product.categoryId);
                const catArr = category.split(',', 10);
                catArr.map((val) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const newProductToCategory = new ProductToCategory_1.ProductToCategory();
                    newProductToCategory.productId = saveProduct.productId;
                    newProductToCategory.categoryId = val;
                    newProductToCategory.isActive = 1;
                    this.productToCategoryService.create(newProductToCategory);
                }));
            }
            // Save products Image
            const productImage = product.image;
            for (const imageRow of productImage) {
                const imageData = JSON.stringify(imageRow);
                const imageResult = JSON.parse(imageData);
                const newProductImage = new ProductImage_1.ProductImage();
                newProductImage.productId = saveProduct.productId;
                newProductImage.image = imageResult.image;
                newProductImage.containerName = imageResult.containerName;
                this.productImageService.create(newProductImage);
            }
            if (saveProduct) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully created Product',
                    data: saveProduct,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 1,
                    message: 'unable to create Product',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // update Product API
    /**
     * @api {post} /api/product/update-product/:id Update Product API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} productId productId
     * @apiParam (Request body) {String} productName productName
     * @apiParam (Request body) {String} productDescription productDescription
     * @apiParam (Request body) {String} sku stock keeping unit
     * @apiParam (Request body) {String} upc upc
     * @apiParam (Request body) {String} image product Image
     * @apiParam (Request body) {String} metaTagTitle metaTagTitle
     * @apiParam (Request body) {String} categoryId CategoryId
     * @apiParam (Request body) {Number}  model model
     * @apiParam (Request body) {String} location location
     * @apiParam (Request body) {String} price price
     * @apiParam (Request body) {String} minimumQuantity minimumQuantity
     * @apiParam (Request body) {String} quantity quantity
     * @apiParam (Request body) {Number} subtractStock subtractStock
     * @apiParam (Request body) {Number} outOfStockStatus outOfStockStatus
     * @apiParam (Request body) {Number} requiredShipping requiredShipping
     * @apiParam (Request body) {String} dateAvailable dateAvailable
     * @apiParam (Request body) {String} condition 1->new 2->used
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParamExample {json} Input
     * {
     *      "productName" : "",
     *      "productDescription" : "",
     *      "sku" : "",
     *      "image" : "",
     *      "metaTagTitle" : "",
     *      "categoryId" : "",
     *      "upc" : "",
     *      "model" : "",
     *      "price" : "",
     *      "location" : "",
     *      "minimumQuantity" : "",
     *      "quantity" : "",
     *      "subtractStock" : "",
     *      "outOfStockStatus" : "",
     *      "requiredShipping" : "",
     *      "dateAvailable" : "",
     *      "status" : "",
     *      "outOfStockStatus" : "",
     *      "condition" : "",
     *      "sortOrder" : "",
     *      "image":[
     *      {
     *      "image":""
     *      "containerName":""
     *      }
     *      ]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated product.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product/update-product/:id
     * @apiErrorExample {json} updateProduct error
     * HTTP/1.1 500 Internal Server Error
     */
    updateProduct(product, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(product);
            const updateProduct = yield this.productService.findOne({
                where: {
                    productId: product.productId,
                },
            });
            if (!updateProduct) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid productId',
                };
                return response.status(400).send(errorResponse);
            }
            updateProduct.name = product.productName;
            updateProduct.description = product.productDescription;
            updateProduct.sku = product.sku;
            updateProduct.upc = product.upc;
            updateProduct.location = product.location;
            updateProduct.quantity = product.quantity;
            updateProduct.price = product.price;
            updateProduct.minimumQuantity = product.minimumQuantity;
            updateProduct.subtractStock = product.subtractStock;
            updateProduct.stockStatusId = product.outOfStockStatus;
            updateProduct.shipping = product.requiredShipping;
            updateProduct.dateAvailable = product.dateAvailable;
            updateProduct.metaTagTitle = product.metaTagTitle;
            updateProduct.manufacturerId = product.model;
            updateProduct.condition = product.condition;
            updateProduct.isActive = product.status;
            updateProduct.sortOrder = product.sortOrder;
            const saveProduct = yield this.productService.create(updateProduct);
            // delete previous category
            this.productToCategoryService.delete({ productId: saveProduct.productId });
            // save category
            if (product.categoryId) {
                const category = product.categoryId;
                console.log('categoryId ' + product.categoryId);
                const catArr = category.split(',', 10);
                catArr.map((val) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const newProductToCategory = new ProductToCategory_1.ProductToCategory();
                    newProductToCategory.productId = saveProduct.productId;
                    newProductToCategory.categoryId = val;
                    newProductToCategory.isActive = 1;
                    this.productToCategoryService.create(newProductToCategory);
                }));
            }
            // Delete previous images
            this.productImageService.delete({ productId: saveProduct.productId });
            // Save products Image
            if (product.image) {
                const productImage = product.image;
                for (const imageRow of productImage) {
                    const imageData = JSON.stringify(imageRow);
                    const imageResult = JSON.parse(imageData);
                    const newProductImage = new ProductImage_1.ProductImage();
                    newProductImage.productId = saveProduct.productId;
                    newProductImage.image = imageResult.image;
                    newProductImage.containerName = imageResult.containerName;
                    this.productImageService.create(newProductImage);
                }
            }
            if (saveProduct) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated Product',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 1,
                    message: 'unable to updated Product',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Product Details API
    /**
     * @api {get} /api/product/product-detail/:id Product Detail API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product Detail",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/product/product-detail/:id
     * @apiErrorExample {json} productDetail error
     * HTTP/1.1 500 Internal Server Error
     */
    productDetail(id, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['productId', 'sku', 'upc', 'name', 'description', 'location', 'minimumQuantity', 'quantity', 'subtractStock', 'metaTagTitle', 'manufacturerId', 'stockStatusId', 'shipping', 'dateAvailable', 'sortOrder', 'price', 'condition', 'isActive'];
            const relation = ['productImage'];
            const WhereConditions = [
                {
                    name: 'productId',
                    op: 'where',
                    value: id,
                },
            ];
            const productDetail = yield this.productService.list(0, 0, select, relation, WhereConditions, 0, 0, 0);
            const productDetails = class_transformer_1.classToPlain(productDetail);
            const promises = productDetails.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const productToCategory = yield this.productToCategoryService.findAll({
                    select: ['categoryId', 'productId'],
                    where: { productId: result.productId },
                }).then((val) => {
                    const category = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        const categoryNames = yield this.categoryService.findOne({ categoryId: value.categoryId });
                        const JsonData = JSON.stringify(categoryNames);
                        const ParseData = JSON.parse(JsonData);
                        const temp = value;
                        temp.categoryName = ParseData.name;
                        return temp;
                    }));
                    const results = Promise.all(category);
                    return results;
                });
                const dd = result;
                dd.Category = productToCategory;
                return dd;
            }));
            // wait until all promises resolve
            const finalResult = yield Promise.all(promises);
            const successResponse = {
                status: 1,
                message: 'Successfully get productDetail',
                data: finalResult,
            };
            return response.status(200).send(successResponse);
        });
    }
    //  Top Selling Product List API
    /**
     * @api {get} /api/product/top-selling-productlist  Top selling ProductList API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get top selling product..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product/top-selling-productlist
     * @apiErrorExample {json} top selling product error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order Detail Function
    topSellingProductList(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const data = yield this.productService.recentProductSelling(4);
            const promise = data.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const product = yield this.productService.findOne({
                    select: ['productId', 'image', 'imagePath', 'price', 'name', 'description'],
                    where: { productId: result.product },
                });
                const temp = result;
                const productImage = yield this.productImageService.findAll({
                    select: ['productId', 'image', 'containerName'],
                    where: { productId: result.product },
                });
                temp.product = product;
                temp.productImage = productImage;
                return temp;
            }));
            const value = yield Promise.all(promise);
            const successResponse = {
                status: 1,
                message: 'Successfully get Top Selling Product..!',
                data: value,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Recent Selling Product List
    /**
     * @api {get} /api/product/recent-selling-product  Recent Selling Product List API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully listed recent product selling!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product/recent-selling-product
     * @apiErrorExample {json} Selling Product List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Recent selling product function
    sellingProduct(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const limit = 3;
            const orderList = yield this.orderProductService.List(limit);
            const promises = orderList.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                console.log(result);
                const order = yield this.orderService.findOrder({
                    select: ['invoiceNo', 'invoicePrefix', 'orderId', 'orderStatusId'],
                    where: { orderId: result.orderId },
                });
                const temp = result;
                temp.order = order;
                const product = yield this.productImageService.findAll({ where: { productId: result.productId } });
                temp.productImage = product;
                return temp;
            }));
            const results = yield Promise.all(promises);
            const successResponse = {
                status: 1,
                message: 'successfully listed recently selling products..!',
                data: results,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get('/productlist'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')), tslib_1.__param(3, routing_controllers_1.QueryParam('sku')), tslib_1.__param(4, routing_controllers_1.QueryParam('status')), tslib_1.__param(5, routing_controllers_1.QueryParam('price')), tslib_1.__param(6, routing_controllers_1.QueryParam('count')), tslib_1.__param(7, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "productList", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/delete-product/:id'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Res()), tslib_1.__param(2, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [deleteProductRequest_1.DeleteProductRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/add-product'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [createProductRequest_1.AddProductRequest, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "addProduct", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/update-product/:id'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [updateProductRequest_1.UpdateProductRequest, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/product-detail/:id'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "productDetail", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/top-selling-productlist'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Req()), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "topSellingProductList", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/recent-selling-product'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Req()), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "sellingProduct", null);
ProductController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/product'),
    tslib_1.__metadata("design:paramtypes", [ProductService_1.ProductService,
        ProductToCategoryService_1.ProductToCategoryService,
        ProductImageService_1.ProductImageService,
        categoryService_1.CategoryService,
        OrderProductService_1.OrderProductService,
        OrderService_1.OrderService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=ProductController.js.map