"use strict";
/*
 * Buildersbase API
 * version 2.0.0
 * http://api.buildersbase.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../decorators/Logger");
const index_1 = require("typeorm/index");
const OrderRepository_1 = require("../repositories/OrderRepository");
let OrderService = class OrderService {
    constructor(orderRepository, log) {
        this.orderRepository = orderRepository;
        this.log = log;
    }
    // create order
    create(order) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new order ');
            return this.orderRepository.save(order);
        });
    }
    // order count
    find(order) {
        return this.orderRepository.find(order);
    }
    // order count
    findAll() {
        return this.orderRepository.find();
    }
    // findOne Condition
    findOne(whereCondition) {
        this.log.info('Find Order Detail');
        const condition = {};
        if (whereCondition && whereCondition.length > 0) {
            condition.where = whereCondition[0];
            condition.relations = whereCondition[1].relation;
        }
        else {
            condition.orderId = whereCondition;
        }
        return this.orderRepository.findOne(condition);
    }
    // update order
    update(id, order) {
        order.oderId = id;
        return this.orderRepository.save(order);
    }
    // order List
    list(limit, offset, select = [], search = [], whereConditions = [], relation = [], count) {
        const condition = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item) => {
                condition.where[item.name] = item.value;
            });
        }
        if (search && search.length > 0) {
            search.forEach((table) => {
                const operator = table.op;
                if (operator === 'where' && table.value !== '') {
                    condition.where[table.name] = table.value;
                }
                else if (operator === 'like' && table.value !== '') {
                    condition.where[table.name] = index_1.Like('%' + table.value + '%');
                }
            });
        }
        if (relation && relation.length > 0) {
            condition.relations = relation;
        }
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.orderRepository.count(condition);
        }
        else {
            return this.orderRepository.find(condition);
        }
    }
    // findOne order
    findOrder(order) {
        return this.orderRepository.findOne(order);
    }
    // delete order
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.orderRepository.delete(id);
        });
    }
    // sales list
    salesList() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.orderRepository.salesList();
        });
    }
    // find today orders
    findAlltodayOrder(todaydate) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.orderRepository.findAllTodayOrder(todaydate);
        });
    }
    // find today orders count
    findAllTodayOrderCount(todaydate) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.orderRepository.findAllTodayOrderCount(todaydate);
        });
    }
};
OrderService = tslib_1.__decorate([
    typedi_1.Service(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(1, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [OrderRepository_1.OrderRepository, Object])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=OrderService.js.map