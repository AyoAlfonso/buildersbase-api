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
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const mail_services_1 = require("../../../auth/mail.services");
const customerRegisterRequest_1 = require("./requests/customerRegisterRequest");
const customerLoginRequest_1 = require("./requests/customerLoginRequest");
const changePasswordRequest_1 = require("./requests/changePasswordRequest");
const Customer_1 = require("../../models/Customer");
const CustomerService_1 = require("../../services/CustomerService");
const loginLogService_1 = require("../../services/loginLogService");
const customerEditProfileRequest_1 = require("./requests/customerEditProfileRequest");
const AWS = tslib_1.__importStar(require("aws-sdk"));
const env_1 = require("../../../env");
const loginLog_1 = require("../../models/loginLog");
let CustomerController = class CustomerController {
    constructor(customerService, loginLogService) {
        this.customerService = customerService;
        this.loginLogService = loginLogService;
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
    register(registerParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newUser = new Customer_1.Customer();
            newUser.firstName = registerParam.name;
            newUser.password = yield Customer_1.Customer.hashPassword(registerParam.password);
            newUser.email = registerParam.emailId;
            newUser.username = registerParam.emailId;
            newUser.mobileNumber = parseInt('' + registerParam.phoneNumberPrefix + registerParam.phoneNumber, 10);
            newUser.customerGroupId = registerParam.customerGroupId;
            newUser.ip = (request.headers['x-forwarded-for'] ||
                request.connection.remoteAddress ||
                request.socket.remoteAddress ||
                request.connection.socket.remoteAddress).split(',')[0];
            const resultUser = yield this.customerService.findOne({ where: { email: registerParam.emailId } });
            if (resultUser) {
                const successResponse = {
                    status: 1,
                    message: 'You already registered please login..!!',
                    statusCode: 'USER_REGISTER_ALREADY',
                };
                return response.status(200).send(successResponse);
            }
            if (registerParam.password === registerParam.confirmPassword) {
                const resultData = yield this.customerService.create(newUser);
                const sendMailRes = mail_services_1.MAILService.RegisterMail(registerParam.emailId, registerParam.name, registerParam.password);
                if (sendMailRes) {
                    const successResponse = {
                        status: 1,
                        message: 'Thank you for registering with us. Kindly check your email inbox for further details. ',
                        data: class_transformer_1.classToPlain(resultData),
                        statusCode: 'USER_REGISTER_COMPLETE',
                    };
                    return response.status(200).send(successResponse);
                }
                else {
                    const errorResponse = {
                        status: 0,
                        message: 'Registration successful, but unable to send email. ',
                        statusCode: 'EMAIL_UNSENT',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            const errorPasswordResponse = {
                status: 0,
                message: 'A mismatch between password and confirm password. ',
                statusCode: 'PASSWORD_MISMATCH',
            };
            return response.status(400).send(errorPasswordResponse);
        });
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
    forgotPassword(forgotparam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const resultData = yield this.customerService.findOne({ where: { email: forgotparam.emailId } });
            if (!resultData) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Email Id',
                };
                return response.status(400).send(errorResponse);
            }
            const tempPassword = Math.random().toString(36).substring(6);
            resultData.password = yield Customer_1.Customer.hashPassword(tempPassword);
            const updateUserData = yield this.customerService.update(resultData.id, resultData);
            const sendMailRes = mail_services_1.MAILService.passwordForgotMail(updateUserData.email, updateUserData.firstName, tempPassword);
            if (sendMailRes) {
                const successResponse = {
                    status: 1,
                    message: 'Your password has been sent to your email inbox. ',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Error in sending email, Invalid email. ',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    login(loginParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // select:['id','firstName','email','mobileNumber','avatar', 'avatarPath'],
            const resultData = yield this.customerService.findOne({
                select: ['id', 'firstName', 'email', 'mobileNumber', 'password', 'avatar', 'avatarPath'],
                where: { email: loginParam.emailId },
            });
            console.log(resultData);
            if (!resultData) {
                const errorUserNameResponse = {
                    status: 0,
                    message: 'Invalid EmailId',
                };
                return response.status(400).send(errorUserNameResponse);
            }
            if (yield Customer_1.Customer.comparePassword(resultData, loginParam.password)) {
                // create a token
                const token = jsonwebtoken_1.default.sign({ id: resultData.id }, '123##$$)(***&', {
                    expiresIn: 86400,
                });
                const loginLog = new loginLog_1.LoginLog();
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
                const savedloginLog = yield this.loginLogService.create(loginLog);
                console.log(savedloginLog);
                const customer = yield this.customerService.findOne({ where: { email: loginParam.emailId } });
                customer.lastLogin = savedloginLog.createdDate;
                // await this.customerService.create(customer);
                const successResponse = {
                    status: 1,
                    message: 'Loggedin successfully.',
                    data: {
                        token,
                        user: class_transformer_1.classToPlain(resultData),
                    },
                };
                return response.status(200).send(successResponse);
            }
            const errorResponse = {
                status: 0,
                message: 'Invalid password',
            };
            return response.status(400).send(errorResponse);
        });
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
    changePassword(changePasswordParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(request.user.id);
            const resultData = yield this.customerService.findOne({ where: { id: request.user.id } });
            if (yield Customer_1.Customer.comparePassword(resultData, changePasswordParam.oldPassword)) {
                const val = yield Customer_1.Customer.comparePassword(resultData, changePasswordParam.newPassword);
                if (val) {
                    const errResponse = {
                        status: 0,
                        message: 'you are given a same password, please try different one',
                    };
                    return response.status(400).send(errResponse);
                }
                resultData.password = yield Customer_1.Customer.hashPassword(changePasswordParam.newPassword);
                const updateUserData = yield this.customerService.update(resultData.id, resultData);
                if (updateUserData) {
                    const successResponse = {
                        status: 1,
                        message: 'Your password changed successfully',
                    };
                    return response.status(200).send(successResponse);
                }
            }
            const errorResponse = {
                status: 0,
                message: 'Your old password is wrong',
            };
            return response.status(400).send(errorResponse);
        });
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
    getProfile(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const resultData = yield this.customerService.findOne({ where: { id: request.user.id } });
            const successResponse = {
                status: 1,
                message: 'Successfully Get the Profile..!',
                data: resultData,
            };
            return response.status(200).send(successResponse);
        });
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
    editProfile(customerEditProfileRequest, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const image = customerEditProfileRequest.image;
            let name;
            const resultData = yield this.customerService.findOne({
                select: ['id', 'firstName', 'lastName', 'email', 'mobileNumber', 'address', 'city', 'countryId', 'pincode', 'avatar', 'avatarPath', 'password'],
                where: { id: request.user.id },
            });
            if (image) {
                const s3 = new AWS.S3();
                const base64Data = new Buffer(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                const type = image.split(';')[0].split('/')[1];
                name = 'Img_' + Date.now() + '.' + type; // path.extname(file.originalname);
                const path = 'customer/';
                const params = {
                    Bucket: env_1.aws_setup.AWS_BUCKET,
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
                resultData.password = yield Customer_1.Customer.hashPassword(customerEditProfileRequest.password);
                const updateUserData = yield this.customerService.update(resultData.id, resultData);
                if (updateUserData) {
                    const successResponseResult = {
                        status: 1,
                        message: 'Your profile Update Successfully..',
                        data: class_transformer_1.classToPlain(updateUserData),
                    };
                    return response.status(200).send(successResponseResult);
                }
            }
            const updateuserData = yield this.customerService.update(resultData.id, resultData);
            const successResponse = {
                status: 1,
                message: 'Your profile Update Successfully..',
                data: class_transformer_1.classToPlain(updateuserData),
            };
            return response.status(200).send(successResponse);
        });
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
    LogList(limit, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const loginLogList = yield this.loginLogService.logList(limit);
            const promise = loginLogList.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const moment = require('moment');
                const createdDate = moment.utc(result.createdDate).local().format('YYYY-MM-DD');
                const temp = result;
                temp.createdDate = createdDate;
                return temp;
            }));
            const finalResult = yield Promise.all(promise);
            const successResponse = {
                status: 1,
                message: 'Successfully get login Log list',
                data: finalResult,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Post('/register'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [customerRegisterRequest_1.CustomerRegisterRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "register", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/forgot-password'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "forgotPassword", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/login'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [customerLoginRequest_1.CustomerLogin, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "login", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/change-password'),
    routing_controllers_1.Authorized('customer'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [changePasswordRequest_1.ChangePassword, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "changePassword", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/get-profile'),
    routing_controllers_1.Authorized('customer'),
    tslib_1.__param(0, routing_controllers_1.Req()), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "getProfile", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/edit-profile'),
    routing_controllers_1.Authorized('customer'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [customerEditProfileRequest_1.CustomerEditProfileRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "editProfile", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/login-log-list'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "LogList", null);
CustomerController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/customer'),
    tslib_1.__metadata("design:paramtypes", [CustomerService_1.CustomerService, loginLogService_1.LoginLogService])
], CustomerController);
exports.CustomerController = CustomerController;
//# sourceMappingURL=CustomerController.js.map