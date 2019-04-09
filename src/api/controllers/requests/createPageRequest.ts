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
import {IsNotEmpty} from 'class-validator';

export class CreatePage {

    @IsNotEmpty({
        message: 'title is required',
    })
    public title: string;

    @IsNotEmpty({
        message: 'content is required',
    })
    public content: string;

    @IsNotEmpty()
    public active: number;

    @IsNotEmpty({
        message: 'metaTagTitle is required',
    })
    public metaTagTitle: string;

    @IsNotEmpty({
        message: 'metaTagContent is required',
    })
    public metaTagContent: string;

    @IsNotEmpty({
        message: 'metaTagKeyword is required',
    })
    public metaTagKeyword: string;
}
