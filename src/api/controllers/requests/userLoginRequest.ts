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
import {IsNotEmpty, IsEmail} from 'class-validator';

export class UserLogin {

    @IsEmail()
    @IsNotEmpty()
    public username: string;

    @IsNotEmpty({
        message: 'Password is required',
    })
    public password: string;

}
