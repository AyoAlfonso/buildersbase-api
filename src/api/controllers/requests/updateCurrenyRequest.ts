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
import { IsNotEmpty , MaxLength } from 'class-validator';

export class UpdateCurrency {

    @IsNotEmpty()
    public currencyId: number;

    @MaxLength(30, {
        message: 'title is maximum 30 character',
    })
    @IsNotEmpty()
    public title: string;

    @MaxLength(3, {
        message: 'code is maximum 3 character',
    })
    public code: string;

    @MaxLength(30, {
        message: 'symbolLeft is maximum 30 character',
    })
    public symbolLeft: string;

    @MaxLength(30, {
        message: 'symbolRight is maximum 30 character',
    })
    public symbolRight: string;

    public value: number;

    @IsNotEmpty()
    public status: number;
}
