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
import {Get, Post, Put, Delete, Body, JsonController, Authorized, QueryParam, Res, Req} from 'routing-controllers';
import {classToPlain} from 'class-transformer';
import {CategoryService} from '../services/categoryService';
import {AddCategory} from './requests/addCategoryRequest';
import {UpdateCategoryRequest} from './requests/updateCategoryRequest';
import {Category} from '../models/categoryModel';
import arrayToTree from 'array-to-tree';
import {DeleteCategoryRequest} from './requests/deleteCategoryRequest';

@JsonController()
export class CategoryController {
    constructor(private categoryService: CategoryService) {
    }

    // create Category API
    /**
     * @api {post} /api/add-category Add Category API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} name Category name
     * @apiParam (Request body) {String} image Category image
     * @apiParam (Request body) {number} parentInt Category  parentInt
     * @apiParam (Request body) {number} sortOrder Category sortOrder
     * @apiParam (Request body) {String} metaTagTitle Category metaTagTitle
     * @apiParam (Request body) {String} metaTagDescription Category metaTagDescription
     * @apiParam (Request body) {String} metaTagKeyword Category metaTagKeyword
     * @apiParam (Request body) {Number} status Category status
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "image" : "",
     *      "parentInt" : "",
     *      "sortOrder" : "",
     *      "metaTagTitle" : "",
     *      "metaTagDescription" : "",
     *      "metaTagKeyword" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created new Category.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/add-category
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/add-category')
    @Authorized()
    public async addCategory(@Body({validate: true}) category: AddCategory, @Res() response: any): Promise<Category> {
        console.log(category.name);
        const newCategory = new Category();
        newCategory.name = category.name;
        newCategory.image = category.image;
        newCategory.parentInt = category.parentInt;
        newCategory.sortOrder = category.sortOrder;
        newCategory.metaTagTitle = category.metaTagTitle;
        newCategory.metaTagDescription = category.metaTagDescription;
        newCategory.metaTagKeyword = category.metaTagKeyword;
        newCategory.isActive = category.status;
        const categorySave = await this.categoryService.create(newCategory);
        if (categorySave !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully created new category.',
                data: categorySave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to create the category. ',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Update Category API
    /**
     * @api {put} /api/update-category/:id Update Category API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} categoryId Category categoryId
     * @apiParam (Request body) {String} name Category name
     * @apiParam (Request body) {String} image Category image
     * @apiParam (Request body) {number} parentInt Category  parentInt
     * @apiParam (Request body) {number} sortOrder Category sortOrder
     * @apiParam (Request body) {String} metaTagTitle Category metaTagTitle
     * @apiParam (Request body) {String} metaTagDescription Category metaTagDescription
     * @apiParam (Request body) {String} metaTagKeyword Category metaTagKeyword
     * @apiParam (Request body) {Number} status Category status
     * @apiParamExample {json} Input
     * {
     *      "categoryId" : "",
     *      "name" : "",
     *      "image" : "",
     *      "imagePath" : "",
     *      "parentInt" : "",
     *      "sortOrder" : "",
     *      "metaTagTitle" : "",
     *      "metaTagDescription" : "",
     *      "metaTagKeyword" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated Category.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/update-category/:id
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-category/:id')
    @Authorized()
    public async updateCategory(@Body({validate: true}) category: UpdateCategoryRequest, @Res() response: any, @Req() request: any): Promise<Category> {
        console.log('cateories1' + category.name);

        const categoryId = await this.categoryService.findOne({
            where: {
                categoryId: category.categoryId,
            },
        });
        if (!categoryId) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid categoryId',
            };
            return response.status(400).send(errorResponse);
        }
        categoryId.name = category.name;
        categoryId.image = category.image;
        categoryId.parentInt = category.parentInt;
        categoryId.sortOrder = category.sortOrder;
        categoryId.metaTagTitle = category.metaTagTitle;
        categoryId.metaTagDescription = category.metaTagDescription;
        categoryId.metaTagKeyword = category.metaTagKeyword;
        categoryId.isActive = category.status;
        const categorySave = await this.categoryService.create(categoryId);
        console.log('category' + categorySave);
        if (categorySave !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated category.',
                data: classToPlain(categorySave),
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to update the category. ',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // delete Category API
    /**
     * @api {delete} /api/delete-category/:id Delete Category API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} categoryId Category categoryId
     * @apiParamExample {json} Input
     * {
     *      "categoryId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Category.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/delete-category/:id
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-category/:id')
    @Authorized()
    public async deleteCategory(@Body({validate: true}) category: DeleteCategoryRequest, @Res() response: any, @Req() request: any): Promise<Category> {

        const categoryId = await this.categoryService.findOne({
            where: {
                categoryId: category.categoryId,
            },
        });
        if (!categoryId) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid categoryId',
            };
            return response.status(400).send(errorResponse);
        }

        const deleteCategory = await this.categoryService.delete(categoryId);
        console.log('category' + deleteCategory);
        if (!deleteCategory) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted category.',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to delete the category. ',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Category List API
    /**
     * @api {get} /api/categorylist Category List API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} sortOrder sortOrder
     * @apiParam (Request body) {String} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully got the complete category list.",
     *      "data":"{ }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/categorylist
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/categorylist')
    @Authorized()
    public async categorylist(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('sortOrder') sortOrder: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        console.log(keyword);
        const select = ['categoryId', 'name', 'image', 'imagePath', 'parentInt', 'sortOrder', 'metaTagTitle', 'metaTagDescription', 'metaTagKeyword', 'isActive'];

        const search = [
            {
                name: 'name',
                op: 'like',
                value: keyword,
            },
            {
                name: 'sortOrder',
                op: 'like',
                value: sortOrder,
            },

        ];
        const WhereConditions = [];
        const category: any = await this.categoryService.list(limit, offset, select, search, WhereConditions, count);
        if (category) {
            const successResponse: any = {
                status: 1,
                message: 'successfully got the complete category list. ',
                data: category,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to get the category list. ',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Category List Tree API
    /**
     * @api {get} /api/category-list-intree Category List InTree API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} sortOrder sortOrder
     * @apiParam (Request body) {String} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully got the complete category list.",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/category-list-intree
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/category-list-intree')
    @Authorized()
    public async categoryListTree(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('sortOrder') sortOrder: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<Category> {
        console.log(keyword);
        const select = ['categoryId', 'name', 'image', 'imagePath', 'parentInt', 'sortOrder', 'metaTagTitle', 'metaTagDescription', 'metaTagKeyword', 'isActive'];

        const search = [
            {
                name: 'name',
                op: 'like',
                value: keyword,
            },
            {
                name: 'sortOrder',
                op: 'like',
                value: sortOrder,
            },

        ];
        const WhereConditions = [];
        const category: any = await this.categoryService.list(limit, offset, select, search, WhereConditions, count);
        if (count) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully get category List count',
                data: category,
            };
            return response.status(200).send(successResponse);
        } else {
            const categoryList = arrayToTree(category, {
                parentProperty: 'parentInt',
                customID: 'categoryId',
            });
            const successResponse: any = {
                status: 1,
                message: 'successfully got the complete category list.',
                data: categoryList,
            };
            return response.status(200).send(successResponse);
        }
    }
}
