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
import { IsNotEmpty , MinLength, MaxLength } from 'class-validator';
export class UpdateCategoryRequest {

    @IsNotEmpty()
    public categoryId: number;

    @MaxLength(30, {
        message: 'Name is maximum 30 character',
    })
    @MinLength(4, {
        message: 'Name is minimum 4 character',
    })
    @IsNotEmpty()
    public name: string;

    public image: string;

    @IsNotEmpty()
    public parentInt: number;

    @IsNotEmpty()
    public sortOrder: number;

    @IsNotEmpty()
    public metaTagTitle: string;

    @IsNotEmpty()
    public metaTagDescription: string;

    @IsNotEmpty()
    public metaTagKeyword: string;

    @IsNotEmpty()
    public status: number;

}
