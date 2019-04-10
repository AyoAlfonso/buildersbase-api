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
import {Post, Body, JsonController, Res, Authorized, Req, Get, QueryParam} from 'routing-controllers';
import {classToPlain} from 'class-transformer';
import jwt from 'jsonwebtoken';
import {MAILService} from '../../../auth/mail.services';
import {CustomerRegisterRequest} from './requests/customerRegisterRequest';
import {CustomerLogin} from './requests/customerLoginRequest';
import {ChangePassword} from './requests/changePasswordRequest';
import {Customer} from '../../models/Customer';
import {CustomerService} from '../../services/CustomerService';
import {LoginLogService} from '../../services/loginLogService';
import {CustomerEditProfileRequest} from './requests/customerEditProfileRequest';
import * as AWS from 'aws-sdk';
import {aws_setup} from '../../../env';
import {LoginLog} from '../../models/loginLog';

@JsonController('/customer')
export class CustomerController {
    constructor(private customerService: CustomerService, private loginLogService: LoginLogService) {
    }

    // Customer Register API
    /**
     * @api {post} /api/customer/register register API
     * @apiGroup Store
     * @apiParam (Request body) {String} name Name
     * @apiParam (Request body) {String} password User Password
     * @apiParam (Request body) {String} confirmPassword Confirm Password
     * @apiParam (Request body) {String} emailId User Email Id
     * @apiParam (Request body) {Number} phoneNumber User Phone Number (Optional)
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "password" : "",
     *      "confirmPassword" : "",
     *      "emailId" : "",
     *      "phoneNumber" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Thank you for registering with us and please check your email",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/register
     * @apiErrorExample {json} Register error
     * HTTP/1.1 500 Internal Server Error
     */
    // Customer Register Function
    @Post('/register')
    public async register(@Body({validate: true})registerParam: CustomerRegisterRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const newUser = new Customer();
        console.log(`Request is coming in: ${registerParam}`);
        newUser.firstName = registerParam.name;
        newUser.password = await Customer.hashPassword(registerParam.password);
        newUser.email = registerParam.emailId;
        newUser.username = registerParam.emailId;
        newUser.mobileNumber = parseInt('' + registerParam.phoneNumberPrefix + registerParam.phoneNumber, 10);
        newUser.customerGroupId = registerParam.customerGroupId;
        newUser.ip = (request.headers['x-forwarded-for'] ||
            request.connection.remoteAddress ||
            request.socket.remoteAddress ||
            request.connection.socket.remoteAddress).split(',')[0];
        const resultUser = await this.customerService.findOne({where: {email: registerParam.emailId}});
        if (resultUser) {
            const successResponse: any = {
                status: 1,
                message: 'You already registered please login..!!',
                statusCode: 'USER_REGISTER_ALREADY',
            };
            return response.status(200).send(successResponse);
        }
        if (registerParam.password === registerParam.confirmPassword) {
            const resultData = await this.customerService.create(newUser);
            const sendMailRes = MAILService.RegisterMail(registerParam.emailId, registerParam.name, registerParam.password);
            if (sendMailRes) {
                const successResponse: any = {
                    status: 1,
                    message: 'Thank you for registering with us. Kindly check your email inbox for further details. ',
                    data: classToPlain(resultData),
                    statusCode: 'USER_REGISTER_COMPLETE',
                };
                return response.status(200).send(successResponse);
            } else {
                const errorResponse: any = {
                    status: 0,
                    message: 'Registration successful, but unable to send email. ',
                    statusCode: 'EMAIL_UNSENT',
                };
                return response.status(400).send(errorResponse);
            }
        }
        const errorPasswordResponse: any = {
            status: 0,
            message: 'A mismatch between password and confirm password. ',
            statusCode: 'PASSWORD_MISMATCH',
        };
        return response.status(400).send(errorPasswordResponse);
    }

    // Forgot Password API
    /**
     * @api {post} /api/customer/forgot-password Forgot Password API
     * @apiGroup Store
     * @apiParam (Request body) {String} emailId User Email Id
     * @apiParamExample {json} Input
     * {
     *      "emailId" : ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Thank you,Your password send to your mail id please check your email..!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/forgot-password
     * @apiErrorExample {json} Forgot Password error
     * HTTP/1.1 500 Internal Server Error
     */
    // Forgot Password Function
    @Post('/forgot-password')
    public async forgotPassword(@Body({validate: true}) forgotparam: any, @Res() response: any): Promise<any> {
        const resultData = await this.customerService.findOne({where: {email: forgotparam.emailId}});
        if (!resultData) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Email Id',
            };
            return response.status(400).send(errorResponse);
        }
        const tempPassword = Math.random().toString(36).substring(6);
        resultData.password = await Customer.hashPassword(tempPassword);
        const updateUserData = await this.customerService.update(resultData.id, resultData);
        const sendMailRes = MAILService.passwordForgotMail(updateUserData.email, updateUserData.firstName, tempPassword);
        if (sendMailRes) {
            const successResponse: any = {
                status: 1,
                message: 'Your password has been sent to your email inbox. ',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Error in sending email, Invalid email. ',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Login API
    /**
     * @api {post} /api/customer/login login API
     * @apiGroup Store
     * @apiParam (Request body) {String} emailId User Email Id
     * @apiParam (Request body) {String} password User Password
     * @apiParamExample {json} Input
     * {
     *      "emailId" : "",
     *      "password" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "data": "{
     *         "token":''
     *      }",
     *      "message": "Successfully login",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/login
     * @apiErrorExample {json} Login error
     * HTTP/1.1 500 Internal Server Error
     */
    // Login Function
    @Post('/login')
    public async login(@Body({validate: true}) loginParam: CustomerLogin, @Req() request: any, @Res() response: any): Promise<any> {
        // select:['id','firstName','email','mobileNumber','avatar', 'avatarPath'],
        console.log(`Request is coming in: ${loginParam}`);
        const resultData = await this.customerService.findOne({
            select: ['id', 'firstName', 'email', 'mobileNumber', 'password', 'avatar', 'avatarPath'],
            where: {email: loginParam.emailId},
        });
        console.log(resultData);
        if (!resultData) {
            const errorUserNameResponse: any = {
                status: 0,
                message: 'Invalid Email',
            };
            return response.status(400).send(errorUserNameResponse);
        }
        if (await Customer.comparePassword(resultData, loginParam.password)) {
            // create a token
            const token = jwt.sign({id: resultData.id}, '123##$$)(***&', {
                expiresIn: 86400, // expires in 24 hours
            });

            const loginLog = new LoginLog();
            loginLog.customerId = resultData.id;
            loginLog.emailId = resultData.email;
            loginLog.firstName = resultData.firstName;
            loginLog.createdBy = resultData.email;
            loginLog.createdDate = Date.now().toString();
            loginLog.modifiedBy = resultData.id;
            // loginLog.modifiedDate = loginLog.createdDate;

            loginLog.ipAddress = (request.headers['x-forwarded-for'] ||
                request.connection.remoteAddress ||
                request.socket.remoteAddress ||
                request.connection.socket.remoteAddress).split(',')[0];
            const savedloginLog = await this.loginLogService.create(loginLog);
            console.log(savedloginLog);

            const customer = await this.customerService.findOne({where: {email: loginParam.emailId}});
            customer.lastLogin = savedloginLog.createdDate;
            // await this.customerService.create(customer);
            const successResponse: any = {
                status: 1,
                message: 'Loggedin successfully.',
                data: {
                    token,
                    user: classToPlain(resultData),
                },
            };
            return response.status(200).send(successResponse);
        }
        const errorResponse: any = {
            status: 0,
            message: 'Invalid password',
        };
        return response.status(400).send(errorResponse);
    }

    // Change Password API
    /**
     * @api {post} /api/customer/change-password Change Password API
     * @apiGroup Store
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} oldPassword Old Password
     * @apiParam (Request body) {String} newPassword New Password
     * @apiParamExample {json} Input
     *      "oldPassword" : "",
     *      "newPassword" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Your password changed successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/change-password
     * @apiErrorExample {json} Change Password error
     * HTTP/1.1 500 Internal Server Error
     */
    // Change Password Function
    @Post('/change-password')
    @Authorized('customer')
    public async changePassword(@Body({validate: true}) changePasswordParam: ChangePassword, @Req() request: any, @Res() response: any): Promise<any> {
        console.log(request.user.id);

        const resultData = await this.customerService.findOne({where: {id: request.user.id}});
        if (await Customer.comparePassword(resultData, changePasswordParam.oldPassword)) {
            const val = await Customer.comparePassword(resultData, changePasswordParam.newPassword);
            if (val) {
                const errResponse: any = {
                    status: 0,
                    message: 'you are given a same password, please try different one',
                };
                return response.status(400).send(errResponse);
            }
            resultData.password = await Customer.hashPassword(changePasswordParam.newPassword);
            const updateUserData = await this.customerService.update(resultData.id, resultData);
            if (updateUserData) {
                const successResponse: any = {
                    status: 1,
                    message: 'Your password changed successfully',
                };
                return response.status(200).send(successResponse);
            }
        }
        const errorResponse: any = {
            status: 0,
            message: 'Your old password is wrong',
        };
        return response.status(400).send(errorResponse);
    }

    // Get Customer Profile API
    /**
     * @api {get} /api/customer/get-profile Get Profile API
     * @apiGroup Store
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Get the Profile..!",
     *      "status": "1"
     *       "data":{}
     * }
     * @apiSampleRequest /api/customer/get-profile
     * @apiErrorExample {json} Get Profile error
     * HTTP/1.1 500 Internal Server Error
     */
    // Get Profile Function
    @Get('/get-profile')
    @Authorized('customer')
    public async getProfile(@Req() request: any, @Res() response: any): Promise<any> {
        const resultData = await this.customerService.findOne({where: {id: request.user.id}});
        const successResponse: any = {
            status: 1,
            message: 'Successfully Get the Profile..!',
            data: resultData,
        };
        return response.status(200).send(successResponse);
    }

    // Customer Edit Profile API
    /**
     * @api {post} /api/customer/edit-profile Edit Profile API
     * @apiGroup Store
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} firstName First Name
     * @apiParam (Request body) {String} lastName Last Name
     * @apiParam (Request body) {String} password password
     * @apiParam (Request body) {String} emailId User Email Id
     * @apiParam (Request body) {String} address Addrress
     * @apiParam (Request body) {Number} countryId Country
     * @apiParam (Request body) {String} city City
     * @apiParam (Request body) {Number} pincode Pincode
     * @apiParam (Request body) {Number} phoneNumber User Phone Number (Optional)
     * @apiParam (Request body) {String} image Customer Image
     * @apiParamExample {json} Input
     * {
     *      "firstName" : "",
     *      "lastName" : "",
     *      "password" "",
     *      "emailId" : "",
     *      "address" : "",
     *      "countryId": "",
     *      "city": "",
     *      "pincode": "",
     *      "phoneNumber" : "",
     *      "image": "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated your profile..!!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/edit-profile
     * @apiErrorExample {json} Register error
     * HTTP/1.1 500 Internal Server Error
     */
    // Customer Profile Edit Function
    @Post('/edit-profile')
    @Authorized('customer')
    public async editProfile(@Body({validate: true}) customerEditProfileRequest: CustomerEditProfileRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const image = customerEditProfileRequest.image;
        let name;

        const resultData = await this.customerService.findOne({
            select: ['id', 'firstName', 'lastName', 'email', 'mobileNumber', 'address', 'city', 'countryId', 'pincode', 'avatar', 'avatarPath', 'password'],
            where: {id: request.user.id},
        });
        if (image) {
            const s3 = new AWS.S3();
            const base64Data = new Buffer(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
            const type = image.split(';')[0].split('/')[1];
            name = 'Img_' + Date.now() + '.' + type; // path.extname(file.originalname);
            const path = 'customer/';
            const params = {
                Bucket: aws_setup.AWS_BUCKET,
                Key: 'customer/' + name,
                Body: base64Data,
                ACL: 'public-read',
                ContentEncoding: 'base64',
                ContentType: `image/${type}`,
            };
            s3.upload(params, (err, data) => {
                if (err) {
                    console.log(err);
                }
                console.log(data);
            });
            resultData.avatar = name;
            resultData.avatarPath = path;
        }
        resultData.firstName = customerEditProfileRequest.firstName;
        resultData.lastName = customerEditProfileRequest.lastName;
        resultData.email = customerEditProfileRequest.emailId;
        resultData.mobileNumber = customerEditProfileRequest.phoneNumber;
        resultData.address = customerEditProfileRequest.address;
        resultData.city = customerEditProfileRequest.city;
        resultData.countryId = customerEditProfileRequest.countryId;
        resultData.pincode = customerEditProfileRequest.pincode;
        resultData.username = customerEditProfileRequest.emailId;
        if (customerEditProfileRequest.password) {
            // if (await Customer.comparePassword(resultData, customerEditProfileRequest.oldPassword)) {
            resultData.password = await Customer.hashPassword(customerEditProfileRequest.password);
            const updateUserData = await this.customerService.update(resultData.id, resultData);
            if (updateUserData) {
                const successResponseResult: any = {
                    status: 1,
                    message: 'Your profile Update Successfully..',
                    data: classToPlain(updateUserData),
                };
                return response.status(200).send(successResponseResult);
            }

        }
        const updateuserData = await this.customerService.update(resultData.id, resultData);
        const successResponse: any = {
            status: 1,
            message: 'Your profile Update Successfully..',
            data: classToPlain(updateuserData),
        };
        return response.status(200).send(successResponse);
    }

    // logList API
    /**
     * @api {get} /api/customer/login-log-list Login Log list API
     * @apiGroup Store
     * @apiParam (Request body) {Number} limit limit
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get login log list",
     *      "data":{
     *      "id"
     *      "customerId"
     *      "emailId"
     *      "firstName"
     *      "ipAddress"
     *      "createdDate"
     *      }
     * }
     * @apiSampleRequest /api/customer/login-log-list
     * @apiErrorExample {json} Front error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/login-log-list')
    public async LogList(@QueryParam('limit') limit: number, @Res() response: any): Promise<any> {
        const loginLogList = await this.loginLogService.logList(limit);
        const promise = loginLogList.map(async (result: any) => {
            const moment = require('moment');
            const createdDate = moment.utc(result.createdDate).local().format('YYYY-MM-DD');
            const temp: any = result;
            temp.createdDate = createdDate;
            return temp;
        });
        const finalResult = await Promise.all(promise);
        const successResponse: any = {
            status: 1,
            message: 'Successfully get login Log list',
            data: finalResult,
        };
        return response.status(200).send(successResponse);

    }
}
