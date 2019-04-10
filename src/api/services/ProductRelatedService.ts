/*
 * Buildersbase API
 * version 2.0.0
 * http://api.buildersbase.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import {Service} from 'typedi';
import {OrmRepository} from 'typeorm-typedi-extensions';
import {Logger, LoggerInterface} from '../../decorators/Logger';
import {ProductRelatedRepository} from '../repositories/ProductRelatedRepository';

@Service()
export class ProductRelatedService {

    constructor(@OrmRepository() private productRelatedRepository: ProductRelatedRepository,
                @Logger(__filename) private log: LoggerInterface) {
    }

    // create related product
    public async create(product: any): Promise<any> {
        this.log.info('create a related product');
        const newProduct = await this.productRelatedRepository.save(product);
        return newProduct;
    }

    // related product list
    public list(limit: number, offset: number, relation: any = [], select: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        const condition: any = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        if (relation && relation.length > 0) {
            condition.relations = relation;
        }
        if (whereConditions && whereConditions.length > 0) {
            condition.where = whereConditions;
        }

        if (count) {
            return this.productRelatedRepository.count(condition);
        }
        return this.productRelatedRepository.find(condition);
    }
}
