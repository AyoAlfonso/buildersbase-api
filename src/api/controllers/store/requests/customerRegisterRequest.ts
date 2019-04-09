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
import {IsNotEmpty, MaxLength, IsEmail, MinLength, IsOptional} from 'class-validator';
export class CustomerRegisterRequest {
    @IsNotEmpty({
        message: 'username is required',
    })
    public name: string;

    @MaxLength(10, {
        message: 'password is maximum 10 character',
    })
    @MinLength(5, {
        message: 'password is minimum 5 character',
    })
    @IsNotEmpty({
        message: 'password is required',
    })
    public password: string;

    @MaxLength(10, {
        message: 'Confirm Password is maximum 10 character',
    })
    @MinLength(5, {
        message: 'Confirm password is minimum 5 character',
    })
    @IsNotEmpty({
        message: 'Confirm password password is required',
    })
    public confirmPassword: string;
    @IsEmail({}, {
        message: 'Please provide username as emailId',
    })
    @IsNotEmpty({
        message: 'Email Id is required',
    })
    public emailId: string;

    @IsNotEmpty({
        message: 'A customer type is required',
    })
    public customerGroupId: number;

    @IsNotEmpty({
        message: 'The phone number prefix phoneNumberPrefix is required',
    })
    public phoneNumberPrefix: number;

    @IsOptional()
    public phoneNumber: number;
}
