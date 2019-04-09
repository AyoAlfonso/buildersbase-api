/*
 * spurtcommerce API
 * version 2.0.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import ejs from 'ejs';
import nodemailer from 'nodemailer';
import SendGrid = require('@sendgrid/mail'); // tslint:disable-line
import smtpTransport from 'nodemailer-smtp-transport';
import {mail} from '../env';

/**
 * API KEY ID: 1VUegtehSP6aiSIPIRguxw
 */
SendGrid.setApiKey('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');

export class MAILService {
// forget password
    public static mail(emailId: string, firstName: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const transporter = nodemailer.createTransport(smtpTransport({
                host: mail.HOST,
                port: mail.PORT,
                secure: mail.SECURE,
                auth: {
                    user: mail.AUTH.user,
                    pass: mail.AUTH.pass,
                },
            }));
            ejs.renderFile('./views/adminForgotPassword.ejs', {emailId, firstName, password}, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    const mailOptions = {
                        from: mail.FROM,
                        to: emailId,
                        subject: 'Changed password successfully',
                        html: data,
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            reject(error);
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                            resolve(info);
                        }
                    });
                }
            });
        });
    }
    // for add customer API
    public static customerLoginMail(username: string, email: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const transporter = nodemailer.createTransport(smtpTransport({
                host: mail.HOST,
                port: mail.PORT,
                secure: mail.SECURE,
                auth: {
                    user: mail.AUTH.user,
                    pass: mail.AUTH.pass,
                },
            }));
            ejs.renderFile('./views/customerLogin.ejs', {username, email, password}, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    const mailOptions = {
                        from: mail.FROM,
                        to: email,
                        subject: 'User Login',
                        html: data,
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log(error);
                            reject(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                            resolve(info);
                        }
                    });
                }
            });
        });
    }
    //  customer register
    public static RegisterMail(emailId: string, name: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            // ejs.renderFile('./views/customerRegisterTemplate.ejs', {emailId, name, password}, (err, data) => {
            //     if (err) {
            //         console.log(err);
            //     } else {
            //         const mailOptions = {
            //             from: mail.FROM,
            //             to: emailId,
            //             subject: 'Registration Successfully',
            //             html: data,
            //         };
            //         transporter.sendMail(mailOptions, (error, info) => {
            //             if (error) {
            //                 reject(error);
            //                 console.log(error);
            //             } else {
            //                 console.log('Email sent: ' + info.response);
            //                 resolve(info);
            //             }
            //         });
            //     }
            // });
            const senderEmail = {
                email: 'support@buildersbase.com',
                name: 'Buildersbase',
            };
            const msg = {
                reply_to: senderEmail,
                to: emailId,
                from: senderEmail,
                subject: `Welcome to Builderbase`,
                templateId: 'eff41554-15c0-4e37-b06b-9d72ff264de8',
                substitutions: {
                     name,
                },
            };
            try {
                    SendGrid.send(msg).then( info => {
                    resolve(info);
                });
            } catch (error) {
                console.error(error.message);
                reject(error);
            }
        });
    }
    // forgot password
    public static passwordForgotMail(emailId: string, userName: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const transporter = nodemailer.createTransport(smtpTransport({
                host: mail.HOST,
                port: mail.PORT,
                secure: mail.SECURE,
                auth: {
                    user: mail.AUTH.user,
                    pass: mail.AUTH.pass,
                },
            }));
            ejs.renderFile('./views/forgotPassword.ejs', {userName, password}, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    const mailOptions = {
                        from: mail.FROM,
                        to: emailId,
                        subject: 'Forgot Password',
                        html: data,
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            reject(error);
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                            resolve(info);
                        }
                    });
                }
            });
        });
    }
    // contact Us
    public static contactMail(email: string, name: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const transporter = nodemailer.createTransport(smtpTransport({
                host: mail.HOST,
                port: mail.PORT,
                secure: mail.SECURE,
                auth: {
                    user: mail.AUTH.user,
                    pass: mail.AUTH.pass,
                },
            }));
            ejs.renderFile('./views/contactTemplate.ejs', {name}, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    const mailOptions = {
                        to: mail.FROM,
                        from: email,
                        subject: 'ContactUs',
                        html: data,
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            reject(error);
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                            resolve(info);
                        }
                    });
                }
            });
        });
    }
    // admin mail for check out
    public static adminOrderMail(orderData: any, productDetailData: any): Promise<any> {
        const nowDate = new Date();
        const today = ('0' + nowDate.getDate()).slice(-2) + '.' + ('0' + (nowDate.getMonth() + 1)).slice(-2) + '.' + nowDate.getFullYear();
        return new Promise((resolve, reject) => {
            const transporter = nodemailer.createTransport(smtpTransport({
                host: mail.HOST,
                port: mail.PORT,
                secure: mail.SECURE,
                auth: {
                    user: mail.AUTH.user,
                    pass: mail.AUTH.pass,
                },
            }));
            ejs.renderFile('./views/adminOrderTemplate.ejs', {orderData, today, productDetailData}, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    const mailOptions = {
                        from: orderData.email,
                        to: mail.FROM,
                        subject: 'Congratulations on your recent order ' + orderData.orderId,
                        html: data,
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            reject(error);
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                            resolve(info);
                        }
                    });
                }
            });
        });
    }
    // customer mail for check out
    public static customerOrderMail(orderData: any, productDetailData: any): Promise<any> {
        const nowDate = new Date();
        const today = ('0' + nowDate.getDate()).slice(-2) + '.' + ('0' + (nowDate.getMonth() + 1)).slice(-2) + '.' + nowDate.getFullYear();
        console.log(mail.PORT);
        console.log(mail.HOST);
        // console.log(mail.SECURE);
        console.log(mail.AUTH.user);
        console.log(mail.AUTH.pass);
        return new Promise((resolve, reject) => {
            const transporter = nodemailer.createTransport(smtpTransport({
                host: mail.HOST,
                port: mail.PORT,
                secure: mail.SECURE,
                auth: {
                    user: mail.AUTH.user,
                    pass: mail.AUTH.pass,
                },
            }));
            ejs.renderFile('./views/customerOrderTemplate.ejs', {
                orderData,
                today,
                productDetailData,
            }, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    const mailOptions = {
                        from: mail.FROM,
                        to: orderData.email,
                        subject: 'Details of your recent Order ' + orderData.orderId,
                        html: data,
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            reject(error);
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                            resolve(info);
                        }
                    });
                }
            });
        });
    }
}
