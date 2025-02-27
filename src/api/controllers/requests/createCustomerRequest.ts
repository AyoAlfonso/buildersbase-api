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
import {IsNotEmpty, IsEmail, MinLength, IsAlphanumeric} from 'class-validator';
export class CreateCustomer {

    @IsNotEmpty()
    public customerGroupId: number;

    @IsNotEmpty()
    public username: string;

    @IsEmail()
    public email: string;

    @IsNotEmpty()
    public mobileNumber: number;

    @IsNotEmpty()
    @IsAlphanumeric()
    @MinLength(5, {
        message: 'password is minimum 5 character',
    })
    public password: string;

    @IsNotEmpty()
    public confirmPassword: string;

    public avatar: string;

    public newsletter: number;

    public safe: number;

    @IsNotEmpty()
    public mailStatus: number;

    @IsNotEmpty()
    public status: number;
}
