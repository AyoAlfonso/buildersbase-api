/*
 * Buildersbase API
 * version 2.0.0
 * http://api.buildersbase.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {Get, JsonController, Authorized, QueryParam, Res, Delete, Body, Req, Post, Param} from 'routing-controllers';
import {ProductService} from '../services/ProductService';
import {ProductToCategoryService} from '../services/ProductToCategoryService';
import {ProductImageService} from '../services/ProductImageService';
import {Product} from '../models/ProductModel';
import {classToPlain} from 'class-transformer';
import {DeleteProductRequest} from './requests/deleteProductRequest';
import {AddProductRequest} from './requests/createProductRequest';
import {UpdateProductRequest} from './requests/updateProductRequest';
import {ProductToCategory} from '../models/ProductToCategory';
import {ProductImage} from '../models/ProductImage';
import {CategoryService} from '../services/categoryService';
import {OrderProductService} from '../services/OrderProductService';
import {OrderService} from '../services/OrderService';

@JsonController('/product')
export class ProductController {
    constructor(private productService: ProductService,
                private productToCategoryService: ProductToCategoryService,
                private productImageService: ProductImageService,
                private categoryService: CategoryService,
                private orderProductService: OrderProductService,
                private orderService: OrderService) {
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
    @Get('/productlist')
    @Authorized()
    public async productList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('sku') sku: string, @QueryParam('status') status: string, @QueryParam('price') price: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<Product> {
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
        const productList: any = await this.productService.list(limit, offset, select, relation, WhereConditions, 0, price, count);
        console.log('productList' + productList);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete product list. ',
            data: classToPlain(productList),
        };
        return response.status(200).send(successResponse);
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
    @Delete('/delete-product/:id')
    @Authorized()
    public async deleteProduct(@Body({validate: true}) productDelete: DeleteProductRequest, @Res() response: any, @Req() request: any): Promise<Product> {

        const product = await this.productService.findOne({
            where: {
                productId: productDelete.productId,
            },
        });
        console.log(product);
        if (!product) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid productId',
            };
            return response.status(201).send(errorResponse);
        }

        const deleteProduct = await this.productService.delete(productDelete.productId);
        console.log('deleteProduct' + deleteProduct);
        if (deleteProduct) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted Product',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to delete product',
            };
            return response.status(201).send(errorResponse);
        }
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
    @Post('/add-product')
    @Authorized()
    public async addProduct(@Body({validate: true}) product: AddProductRequest, @Res() response: any): Promise<any> {
        console.log(product);
        const newProduct: any = new Product();
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
        newProduct.manufacturerId = product.manufactureId;
        newProduct.isActive = product.status;
        newProduct.sortOrder = product.sortOrder;
        newProduct.uniquecode = product.uniquecode;
        newProduct.image  = product.images.image;
        console.log('this is pdt img', product.images);
        const saveProduct = await this.productService.create(newProduct);

        // save category
        if (product.categoryId) {
            const category = product.categoryId;
            console.log('categoryId ' + product.categoryId);
            const catArr = category.split(',', 10);
            catArr.map(async (val: any) => {
                const newProductToCategory: any = new ProductToCategory();
                newProductToCategory.productId = saveProduct.productId;
                newProductToCategory.categoryId = val;
                newProductToCategory.isActive = 1;
                this.productToCategoryService.create(newProductToCategory);
            });
        }

        // Save products Image
        // const productImage: any = product.images;
        // for (const imageRow of productImage) {
        //     const imageData = JSON.stringify(imageRow);
        //     console.log('this' + imageData);
        //     const imageResult = JSON.parse(imageData);
        //     const newProductImage = new ProductImage();
        //     newProductImage.productId = saveProduct.productId;
        //     newProductImage.image = imageResult.image;
        //     newProductImage.containerName = imageResult.containerName;
        //     this.productImageService.create(newProductImage);
        // }

        if (saveProduct) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully created Product',
                data: saveProduct,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 1,
                message: 'unable to create Product',
            };
            return response.status(201).send(errorResponse);
        }

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
    @Post('/update-product/:id')
    @Authorized()
    public async updateProduct(@Body({validate: true}) product: UpdateProductRequest, @Res() response: any): Promise<any> {
        console.log(product);
        const updateProduct: any = await this.productService.findOne({
            where: {
                productId: product.productId,
            },
        });
        if (!updateProduct) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid productId',
            };
            return response.status(201).send(errorResponse);
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
        updateProduct.feature = product.feature;
        const saveProduct = await this.productService.create(updateProduct);

        // delete previous category
        this.productToCategoryService.delete({productId: saveProduct.productId});

        // save category
        if (product.categoryId) {
            const category = product.categoryId;
            console.log('categoryId ' + product.categoryId);
            const catArr = category.split(',', 10);
            catArr.map(async (val: any) => {
                const newProductToCategory: any = new ProductToCategory();
                newProductToCategory.productId = saveProduct.productId;
                newProductToCategory.categoryId = val;
                newProductToCategory.isActive = 1;
                this.productToCategoryService.create(newProductToCategory);
            });
        }

        // Delete previous images
        this.productImageService.delete({productId: saveProduct.productId});
        // Save products Image
        if (product.image) {
            const productImage: any = product.image;
            for (const imageRow of productImage) {
                const imageData = JSON.stringify(imageRow);
                const imageResult = JSON.parse(imageData);
                const newProductImage = new ProductImage();
                newProductImage.productId = saveProduct.productId;
                newProductImage.image = imageResult.image;
                newProductImage.containerName = imageResult.containerName;
                this.productImageService.create(newProductImage);
            }
        }

        if (saveProduct) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated Product',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 1,
                message: 'unable to updated Product',
            };
            return response.status(201).send(errorResponse);
        }

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
    @Get('/product-detail/:id')
    @Authorized()
    public async productDetail(@Param('id') id: number, @Res() response: any): Promise<any> {
        const select = ['productId', 'sku', 'upc', 'name', 'description', 'location', 'minimumQuantity', 'quantity', 'subtractStock', 'metaTagTitle', 'manufacturerId', 'stockStatusId', 'shipping', 'dateAvailable', 'sortOrder', 'price', 'condition', 'isActive'];

        const relation = ['productImage'];

        const WhereConditions = [
            {
                name: 'productId',
                op: 'where',
                value: id,
            },
        ];

        const productDetail: any = await this.productService.list(0, 0, select, relation, WhereConditions, 0, 0, 0);
        const productDetails: any = classToPlain(productDetail);
        const promises = productDetails.map(async (result: any) => {
            const productToCategory = await this.productToCategoryService.findAll({
                select: ['categoryId', 'productId'],
                where: {productId: result.productId},
            }).then((val) => {
                const category = val.map(async (value: any) => {
                    const categoryNames = await this.categoryService.findOne({categoryId: value.categoryId});
                    const JsonData = JSON.stringify(categoryNames);
                    const ParseData = JSON.parse(JsonData);
                    const temp: any = value;
                    temp.categoryName = ParseData.name;
                    return temp;
                });

                const results = Promise.all(category);
                return results;
            });
            const dd: any = result;
            dd.Category = productToCategory;
            return dd;
        });
        // wait until all promises resolve
        const finalResult = await Promise.all(promises);
        const successResponse: any = {
            status: 1,
            message: 'Successfully get productDetail',
            data: finalResult,
        };
        return response.status(200).send(successResponse);
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
    @Get('/top-selling-productlist')
    @Authorized()
    public async topSellingProductList(@Req() request: any, @Res() response: any): Promise<any> {
        const data = await this.productService.recentProductSelling(4);
        const promise = data.map(async (result: any) => {
            const product = await this.productService.findOne({
                select: ['productId', 'image', 'imagePath', 'price', 'name', 'description'],
                where: {productId: result.product},
            });
            const temp: any = result;
            const productImage = await this.productImageService.findAll({
                select: ['productId', 'image', 'containerName'],
                where: {productId: result.product},
            });
            temp.product = product;
            temp.productImage = productImage;
            return temp;
        });

        const value = await Promise.all(promise);

        const successResponse: any = {
            status: 1,
            message: 'Successfully get Top Selling Product..!',
            data: value,
        };
        return response.status(200).send(successResponse);
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
    @Get('/recent-selling-product')
    @Authorized()
    public async sellingProduct(@Req() request: any, @Res() response: any): Promise<any> {
        const limit = 3;
        const orderList = await this.orderProductService.List(limit);
        const promises = orderList.map(async (result: any) => {
            console.log(result);
            const order = await this.orderService.findOrder({
                select: ['invoiceNo', 'invoicePrefix', 'orderId', 'orderStatusId'],
                where: {orderId: result.orderId},
            });
            const temp: any = result;
            temp.order = order;
            const product = await this.productImageService.findAll({where: {productId: result.productId}});
            temp.productImage = product;
            return temp;
        });
        const results = await Promise.all(promises);
        const successResponse: any = {
            status: 1,
            message: 'successfully listed recently selling products..!',
            data: results,
        };
        return response.status(200).send(successResponse);
    }
}
