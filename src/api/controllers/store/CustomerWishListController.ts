/*
 * spurtcommerce API
 * version 2.0.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {Post, JsonController, Res, Req , Authorized, Delete , Param, Get , QueryParam } from 'routing-controllers';
import { classToPlain } from 'class-transformer';
import { CustomerWishlist } from '../../models/customerWishlist';
import {CustomerWishlistService} from '../../services/CustomerWishlistService';
import {ProductImageService} from '../../services/ProductImageService';
@JsonController('/customer')
export class CustomerController {
    constructor(private customerWishlistService: CustomerWishlistService,
                private productImageService: ProductImageService) { }

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
    @Post('/add-product-to-wishlist')
    @Authorized('customer')
    public async addProductToWishlist(@Req() request: any ,  @Res() response: any): Promise<any> {
        const data = await this.customerWishlistService.findOne({where: {productId: request.body.productId, customerId: request.user.id}});
        if (data) {
            const errorResponse: any = {
                status: 1,
                message: 'Already added this product....!',
            };
           return response.status(200).send(errorResponse);
        }
        const newProduct = new CustomerWishlist();
        newProduct.customerId = request.user.id;
        newProduct.productId = request.body.productId;
        newProduct.isActive = 1 ;
        const resultData = await this.customerWishlistService.create(newProduct);
        const successResponse: any = {
                    status: 1,
                    message: 'Thank you product added to the wishlist successfully..!',
                    data: classToPlain(resultData),
        };
        return response.status(200).send(successResponse);
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
    @Delete('/wishlist-product-delete/:id')
    @Authorized('customer')
    public async wishlistProductDelete(@Param('id') wishlistId: number, @Req() request: any ,  @Res() response: any): Promise<any> {
        await this.customerWishlistService.delete(wishlistId);
        const successResponse: any = {
                    status: 1,
                    message: 'Thank you deleted the product from wishlist successfully..!',
        };
       return  response.status(200).send(successResponse);
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
    @Get('/wishlist-product-list')
    @Authorized('customer')
    public async wishlistProductlist(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number , @QueryParam('count') count: number | boolean , @Req() request: any , @Res() response: any): Promise<CustomerWishlist> {
        const relation = ['product'];
        const select = ['wishlistProductId'];
        const whereConditions = [
            {
                customerId: request.user.id,
            },
        ];
        const wishlistData = await this.customerWishlistService.list(limit, offset , relation , select , whereConditions , count);
        if (count) {
            const Response: any = {
                status: 1,
                message: 'Successfully get count',
                data: wishlistData,
            };
            return response.status(200).send(Response);
        }
        const promises = wishlistData.map(async (results: any) => {
            console.log(results.product);
            console.log(results.product.productId);
            const Id = results.product.productId;
            const Image = await this.productImageService.findOne({where: {productId: Id }});
            results.productImage = Image;
            return results;
        });
        const result = await Promise.all(promises);
        const successResponse: any = {
            status: 1,
            message: 'Successfully show the wishlist Product List',
            data: classToPlain(result),
        };
        return response.status(200).send(successResponse);
    }
}
