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
import {Post, JsonController, Req, Res, Get, QueryParam, Body, Authorized} from 'routing-controllers';
import {classToPlain} from 'class-transformer';
import {CustomerCheckoutRequest} from './requests/customerCheckoutRequest';
import {OrderService} from '../../services/OrderService';
import {OrderProductService} from '../../services/OrderProductService';
import {OrderTotalService} from '../../services/OrderTotalService';
import {Order} from '../../models/Order';
import {OrderProduct} from '../../models/OrderProduct';
import {OrderTotal} from '../../models/OrderTotal';
import {CustomerService} from '../../services/CustomerService';
import {MAILService} from '../../../auth/mail.services';
import {ProductService} from '../../services/ProductService';
import {ProductImageService} from '../../services/ProductImageService';
import {SettingService} from '../../services/SettingService';

@JsonController('/orders')
export class CustomerOrderController {
    constructor(private orderService: OrderService, private orderProductService: OrderProductService, private orderTotalService: OrderTotalService,
                private customerService: CustomerService, private productService: ProductService, private productImageService: ProductImageService, private settingService: SettingService) {
    }

    // customer checkout
    /**
     * @api {post} /api/orders/customer-checkout Checkout
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} productDetail Product Details
     * @apiParam (Request body) {String} shippingFirstName Shipping First name
     * @apiParam (Request body) {String} shippingLastName Shipping Last Name
     * @apiParam (Request body) {String} shippingCompany Shipping Company
     * @apiParam (Request body) {String} shippingAddress_1 Shipping Address 1
     * @apiParam (Request body) {String} shippingAddress_2 Shipping Address 2
     * @apiParam (Request body) {String} shippingCity Shipping City
     * @apiParam (Request body) {Number} shippingPostCode Shipping PostCode
     * @apiParam (Request body) {String} shippingCountry Shipping Country
     * @apiParam (Request body) {String} shippingZone Shipping Zone
     * @apiParam (Request body) {String} shippingAddressFormat Shipping Address Format
     * @apiparam (Request body) {Number} phoneNumber Customer Phone Number
     * @apiparam (Request body) {String} emailId Customer Email Id
     * @apiParamExample {json} Input
     * {
     *      "productDetail" :[
     *      {
     *      "productId" : "",
     *      "quantity" : "",
     *      "price" : "",
     *      "model" : "",
     *      "name" : "",
     *      }]
     *      "shippingFirstName" : "",
     *      "shippingLastName" : "",
     *      "shippingCompany" : "",
     *      "shippingAddress_1" : "",
     *      "shippingAddress_2" : "",
     *      "shippingCity" : "",
     *      "shippingPostCode" : "",
     *      "shippingCountry" : "",
     *      "shippingZone" : "",
     *      "shippingAddressFormat" : "",
     *      "phoneNumber" : "",
     *      "emailId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Check Out the product successfully And Send order detail in your mail ..!!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/orders/customer-checkout
     * @apiErrorExample {json} Checkout error
     * HTTP/1.1 500 Internal Server Error
     */
    // Customer Checkout Function
    @Post('/customer-checkout')
    @Authorized('customer')
    public async customerCheckout(@Body({validate: true}) checkoutParam: CustomerCheckoutRequest, @Res() response: any, @Req() request: any): Promise<any> {
        const newOrder: any = new Order();
        const newOrderTotal = new OrderTotal();
        let orderProduct = [];
        let i;
        let n;
        let totalProductAmount;
        let totalAmount = 0;
        const productDetailData = [];
        newOrder.customerId = request.user.id;
        newOrder.email = checkoutParam.emailId;
        newOrder.telephone = checkoutParam.phoneNumber;
        newOrder.shippingFirstname = checkoutParam.shippingFirstName;
        newOrder.shippingLastname = checkoutParam.shippingLastName;
        newOrder.shippingAddress1 = checkoutParam.shippingAddress_1;
        newOrder.shippingAddress2 = checkoutParam.shippingAddress_2;
        newOrder.shippingCompany = checkoutParam.shippingCompany;
        newOrder.shippingCity = checkoutParam.shippingCity;
        newOrder.shippingCountry = checkoutParam.shippingCountry;
        newOrder.shippingZone = checkoutParam.shippingZone;
        newOrder.shippingPostcode = checkoutParam.shippingPostCode;
        newOrder.shippingAddressFormat = checkoutParam.shippingAddressFormat;
        newOrder.paymentFirstname = checkoutParam.shippingFirstName;
        newOrder.paymentLastname = checkoutParam.shippingLastName;
        newOrder.paymentAddress1 = checkoutParam.shippingAddress_1;
        newOrder.paymentAddress2 = checkoutParam.shippingAddress_2;
        newOrder.paymentCompany = checkoutParam.shippingCompany;
        newOrder.paymentCity = checkoutParam.shippingCity;
        newOrder.paymentCountry = checkoutParam.shippingCountry;
        newOrder.paymentZone = checkoutParam.shippingZone;
        newOrder.paymentPostcode = checkoutParam.shippingPostCode;
        const setting = await this.settingService.findOne();
        newOrder.orderStatusId = setting.orderStatus;
        newOrder.paymentAddressFormat = checkoutParam.shippingAddressFormat;
        const orderData = await this.orderService.create(newOrder);
        orderProduct = checkoutParam.productDetails;
        for (i = 0; i < orderProduct.length; i++) {
            const productDetails = new OrderProduct();
            productDetails.productId = orderProduct[i].productId;
            productDetails.name = orderProduct[i].name;
            productDetails.orderId = orderData.orderId;
            productDetails.quantity = orderProduct[i].quantity;
            productDetails.total = +orderProduct[i].quantity * +orderProduct[i].price;
            productDetails.model = orderProduct[i].model;
            const productInformatiom = await this.orderProductService.createData(productDetails);
            const productImageData = await this.productService.findOne(productInformatiom.productId);
            const productImageDetail = await this.productImageService.findOne({where: {productId: productInformatiom.productId}});
            productImageData.productInformatiomData = productInformatiom;
            productImageData.productImage = productImageDetail;
            productDetailData.push(productImageData);
            totalProductAmount = await this.orderProductService.findData(orderProduct[i].productId, orderData.orderId);
            for (n = 0; n < totalProductAmount.length; n++) {
                totalAmount += +totalProductAmount[n].total;
            }
        }
        newOrder.total = totalAmount;
        newOrder.invoiceNo = orderData.orderId;
        newOrder.invoicePrefix = 'spu';
        const resultData = await this.orderService.update(orderData.orderId, newOrder);
        newOrderTotal.orderId = orderData.orderId;
        newOrderTotal.value = totalAmount;
        await this.orderTotalService.createOrderTotalData(newOrderTotal);
        // MAILService.adminOrderMail(orderData, productDetailData);
        const sendMailRes = MAILService.customerOrderMail(orderData, productDetailData);
        if (sendMailRes) {
            const successResponse: any = {
                status: 1,
                message: 'You successfully checked out the product and order details send to your mail',
                data: resultData,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Customer Mail does not send but Order Successfully',
            };
            return response.status(201).send(errorResponse);
        }
    }

    // Customer Order List API
    /**
     * @api {get} /api/orders/order-list My Order List
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully show the Order List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/orders/order-list
     * @apiErrorExample {json} Order List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order List Function
    @Get('/order-list')
    @Authorized('customer')
    public async orderList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const search = [
            {
                name: 'customerId',
                op: 'where',
                value: request.user.id,
            },
        ];
        const whereConditions = 0;
        const select = ['orderId', 'customerId', 'currencyId', 'orderStatus', 'total', 'createdDate'];
        const relation = ['orderStatus'];
        const OrderData = await this.orderService.list(limit, offset, select, search, whereConditions, relation, count);
        if (count) {
            const Response: any = {
                status: 1,
                message: 'Successfully get Count. ',
                data: OrderData,
            };
            return response.status(200).send(Response);
        }
        const promises = OrderData.map(async (results: any) => {
            const Id = results.orderId;
            const countValue = await this.orderProductService.findAndCount({where: {orderId: Id}});
            results.items = countValue[1];
            return results;
        });
        const result = await Promise.all(promises);
        const successResponse: any = {
            status: 1,
            message: 'Successfully shown the order list. ',
            data: classToPlain(result),
        };
        return response.status(200).send(successResponse);
    }

    // Customer Order Detail API
    /**
     * @api {get} /api/orders/order-detail My OrderDetail
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderId Order Id
     * @apiParamExample {json} Input
     * {
     *      "orderId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully show the Order Detail..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/orders/order-detail
     * @apiErrorExample {json} Order Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order Detail Function
    @Get('/order-detail')
    @Authorized('customer')
    public async orderDetail(@QueryParam('orderId') orderid: number, @Req() request: any, @Res() response: any): Promise<any> {
        const orderData = await this.orderService.find({where: {orderId: orderid, customerId: request.user.id}});
        const promises = orderData.map(async (result: any) => {
            const product = await this.orderProductService.find({where: {orderId: orderid}}).then((val) => {
                console.log(val);
                const productVal = val.map(async (value: any) => {
                    const productDetail = await this.productService.findOne({productId: value.productId});
                    const tempData: any = value;
                    tempData.productDetail = productDetail;
                    return tempData;
                });
                const results = Promise.all(productVal);
                return results;
            });
            const temp: any = result;
            temp.productList = product;
            const customer = await this.customerService.findOne({where: {id: request.user.id}});
            temp.customerDetail = customer;
            return temp;
        });
        const resultData = await Promise.all(promises);
        const successResponse: any = {
            status: 1,
            message: 'Successfully shown the order Detail. ',
            data: resultData,
        };
        return response.status(200).send(successResponse);
    }
}
