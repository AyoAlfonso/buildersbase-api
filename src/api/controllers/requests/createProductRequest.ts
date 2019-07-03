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
import { IsNotEmpty  } from 'class-validator';
export class AddProductRequest {

    @IsNotEmpty()
    public productName: string;

    @IsNotEmpty()
    public productDescription: string;

    @IsNotEmpty()
    public sku: string;

    @IsNotEmpty()
    public upc: string;

    @IsNotEmpty()
    public metaTagTitle: string;

    @IsNotEmpty()
    public categoryId: string;

    public images: any;

    public singleimage: any;

    @IsNotEmpty()
    public model: number;

    @IsNotEmpty()
    public price: string;

    @IsNotEmpty()
    public location: string;

    @IsNotEmpty()
    public minimumQuantity: string;

    @IsNotEmpty()
    public quantity: string;

    @IsNotEmpty()
    public subtractStock: number;

    @IsNotEmpty()
    public outOfStockStatus: number;

    @IsNotEmpty()
    public requiredShipping: number;

    @IsNotEmpty()
    public dateAvailable: string;

    @IsNotEmpty()
    public condition: number;

    @IsNotEmpty()
    public status: number;
 
    public uniquecode: string;

    public manufactureId: number;

    @IsNotEmpty()
    public sortOrder: number;

}
