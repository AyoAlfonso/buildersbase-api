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
import {Get, Put, Post, Delete, Body, JsonController, Authorized, Res, Req, QueryParam } from 'routing-controllers';
import * as AWS from 'aws-sdk';
import {CreateManufacturer} from './requests/createManufacturerRequest';
import {Manufacturer} from '../models/manufacturerModel';
import {ManufacturerService} from '../services/manufacturerService';
import {aws_setup} from '../../env';
import {UpdateManufacturer} from './requests/updateManufacturerRequest';
import {DeleteManufacturer} from './requests/deleteManufacturerRequest';

// S3 SetUp
AWS.config.update( {
    accessKeyId: aws_setup.AWS_ACCESS_KEY_ID,
    secretAccessKey: aws_setup.AWS_SECRET_ACCESS_KEY,
    region: aws_setup.AWS_DEFAULT_REGION,
});

@JsonController('/manufacturer')
export class ManufacturerController {
    constructor(private manufacturerService: ManufacturerService) {
    }

    // Create Manufacturer API
    /**
     * @api {post} /api/manufacturer/create-manufacturer Create Manufacturer API
     * @apiGroup Manufacturer
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} name Manufacturer name
     * @apiParam (Request body) {String} image Manufacturer image
     * @apiParam (Request body) {number} sortOrder Manufacturer sortOrder
     * @apiParam (Request body) {number} status status
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "image" : "",
     *      "imagePath" : "",
     *      "sortOrder" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created new Manufacturer.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/manufacturer/create-manufacturer
     * @apiErrorExample {json} Manufacturer error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/create-manufacturer')
    @Authorized()
    public async createManufacturer(@Body({validate: true}) manufacturer: CreateManufacturer, @Req() request: any, @Res() response: any): Promise<any> {
        // const image = manufacturer.image;
        // if (image) {
        //     const s3 = new AWS.S3();
            const name = 'https://s3.us-east-2.amazonaws.com/buildersbase-resources/bricks.de6d525b.jpg';
            const path = 'manufacturer/';
        //     const base64Data = new Buffer(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
        //     const type = image.split(';')[0].split('/')[1];
        //     const name = 'Img_' + Date.now() + '.' + type;
        //     const params = {
        //         Bucket: aws_setup.AWS_BUCKET,
        //         Key:  'manufacturer/' + name,
        //         Body: base64Data,
        //         ACL: 'public-read',
        //         ContentEncoding: 'base64',
        //         ContentType: `image/${type}`,
        //     };
            console.log(manufacturer);
            const newManufacturer: any = new Manufacturer();
            // newManufacturer.name = manufacturer.name;
            newManufacturer.image = name;
            newManufacturer.imagePath = path;
            newManufacturer.sortOrder = manufacturer.sortOrder;
            newManufacturer.isActive = manufacturer.status;
            newManufacturer.vendor = manufacturer.vendor;
            const manufacturerSave = await this.manufacturerService.create(newManufacturer);
            // s3.upload(params, (err, data) => {
            //     if (err) {
            //         console.log(err);
            //     }
            //     console.log(data);
            // });
            console.log('manufacturer' + manufacturerSave);
            console.log('Image successfully uploaded.');
                const successResponse: any = {
                    status: 1,
                    message: 'Successfully created a new manufacturer.',
                    data: {name},
                };
                return response.status(200).send(successResponse);
        }

    // Manufacturer List API
    /**
     * @api {get} /api/manufacturer/manufacturerlist Manufacturer List API
     * @apiGroup Manufacturer
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count in number
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get manufacturer list",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/manufacturer/manufacturerlist
     * @apiErrorExample {json} Manufacturer error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/manufacturerlist')
    @Authorized()
    public async manufacturerList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count')count: number| boolean, @Res() response: any): Promise <any> {
        const select = ['manufacturerId', 'name', 'image', 'imagePath', 'sortOrder', 'isActive'];
        const search = [
            {
                name: 'name',
                op: 'like',
                value: keyword,
            },
        ];
        const WhereConditions = [];
        const manufacturerList: any = await this.manufacturerService.list(limit, offset, select, search, WhereConditions, count);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete manufacturers list.',
            data: manufacturerList,
        };
        return response.status(200).send(successResponse);
    }

    // Delete Manufacturer API
    /**
     * @api {delete} /api/manufacturer/delete-manufacturer/:id Delete Manufacturer API
     * @apiGroup Manufacturer
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} manufacturerId Manufacturer manufacturerId
     * @apiParamExample {json} Input
     * {
     *      "manufacturerId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Manufacturer.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/manufacturer/delete-manufacturer/:id
     * @apiErrorExample {json} Manufacturer error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-manufacturer/:id')
    @Authorized()
    public async deleteManufacturer(@Body({validate: true}) manufacturer: DeleteManufacturer, @Res() response: any, @Req() request: any): Promise<Manufacturer> {

        const ManufacturerData = await this.manufacturerService.findOne({
            where: {
                manufacturerId: manufacturer.manufacturerId,
            },
        });
        if (!ManufacturerData) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid manufacturerId',
            };
            return response.status(201).send(errorResponse);
        }

        const deleteManufacturer: any = await this.manufacturerService.delete(ManufacturerData.manufacturerId);
        console.log('manufacturer' + deleteManufacturer);
        if (!deleteManufacturer) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted the manufacturer. ',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to delete manufacturer',
            };
            return response.status(201).send(errorResponse);
        }
    }

    // Update Manufacturer API
    /**
     * @api {put} /api/manufacturer/update-manufacturer/:id Update Manufacturer API
     * @apiGroup Manufacturer
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} manufacturerId Manufacturer manufacturerId
     * @apiParam (Request body) {String} name Manufacturer name
     * @apiParam (Request body) {String} image Manufacturer image
     * @apiParam (Request body) {number} sortOrder Manufacturer sortOrder
     * @apiParam (Request body) {number} status Manufacturer status
     * @apiParamExample {json} Input
     * {
     *      "manufacturerId" : "",
     *      "name" : "",
     *      "image" : "",
     *      "sortOrder" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated Manufacturer.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/manufacturer/update-manufacturer/:id
     * @apiErrorExample {json} Manufacturer error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-manufacturer/:id')
    @Authorized()
    public async updateManufacturer(@Body({validate: true}) manufacturerParam: UpdateManufacturer, @Res() response: any, @Req() request: any): Promise<any> {

        const manufacturer = await this.manufacturerService.findOne({
            where: {
                manufacturerId: manufacturerParam.manufacturerId,
            },
        });
        if (!manufacturer) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid manufacturerId',
            };
            return response.status(201).send(errorResponse);
        }
        const image = manufacturerParam.image;
        if (image) {
            const type = image.split(';')[0].split('/')[1];
            const name = 'Img_' + Date.now() + '.' + type;
            const s3 = new AWS.S3();
            const path = 'manufacturer/';
            const base64Data = new Buffer(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
            const params = {
                Bucket: aws_setup.AWS_BUCKET,
                Key: 'manufacturer/' + name,
                Body: base64Data,
                ACL: 'public-read',
                ContentEncoding: 'base64',
                ContentType: `image/${type}`,
            };
            s3.upload(params, (err, data) => {
                if (data) {
                    console.log('image upload successfully');
                    console.log(data);
                } else {
                    console.log('error while uploading image');
                }
            });
            manufacturer.image = name;
            manufacturer.imagePath = path;
        }
        manufacturer.name = manufacturerParam.name;
        manufacturer.sortOrder = manufacturerParam.sortOrder;
        manufacturer.isActive = manufacturerParam.status;
        const manufacturerSave = await this.manufacturerService.create(manufacturer);

        if (manufacturerSave !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated the manufacturer.',
                data: manufacturerSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to update manufacturer',
            };
            return response.status(201).send(errorResponse);
        }
    }
}
