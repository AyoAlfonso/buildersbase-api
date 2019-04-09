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
import {IsNotEmpty, IsEmail, IsOptional, MaxLength, MinLength} from 'class-validator';

export class CustomerEditProfileRequest {
    // @IsString()
    @IsNotEmpty({
        message: 'First name is required',
    })
    public firstName: string;

    @IsNotEmpty({
        message: 'Last name is required',
    })
    public lastName: string;

    @IsOptional()
    @MaxLength(10, {
        message: 'Old Password is maximum 10 character',
    })
    @MinLength(5, {
        message: 'Old Password is minimum 5 character',
    })
    @IsNotEmpty()
    public password: string;

    @IsEmail({}, {
        message: 'Please provide username as emailId',
    })
    @IsNotEmpty({
        message: 'Email Id is required',
    })
    public emailId: string;

    @IsOptional()
    @IsNotEmpty()
    public address: string;

    @IsNotEmpty()
    public countryId: number;

    @IsOptional()
    @IsNotEmpty()
    public city: string;

    @IsOptional()
    public pincode: string;

    @IsOptional()
    @IsNotEmpty()
    public phoneNumber: number;

    public image: string;
}
