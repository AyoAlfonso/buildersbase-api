"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateCustomerTable1546524561001 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'customer',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        length: '11',
                        isGenerated: true,
                        generationStrategy: 'increment',
                        isPrimary: true,
                        isNullable: false,
                    }, {
                        name: 'first_name',
                        type: 'varchar',
                        length: '512',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'last_name',
                        type: 'varchar',
                        length: '512',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'username',
                        type: 'varchar',
                        length: '512',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'email',
                        type: 'varchar',
                        length: '512',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'password',
                        type: 'varchar',
                        length: '512',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'mobile',
                        type: 'varchar',
                        length: '10',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'address',
                        type: 'varchar',
                        length: '128',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'countryId',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'city',
                        type: 'varchar',
                        length: '128',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'pincode',
                        type: 'varchar',
                        length: '6',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'avatar',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'avatar_path',
                        type: 'TEXT',
                        length: '128',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'newsletter',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'delete_flag',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'mail_status',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'customer_group_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'safe',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'last_login',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'ip',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'is_active',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'created_by',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'modified_by',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'created_date',
                        type: 'DATETIME',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    }, {
                        name: 'modified_date',
                        type: 'DATETIME',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            });
            yield queryRunner.createTable(table);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('customer');
        });
    }
}
exports.CreateCustomerTable1546524561001 = CreateCustomerTable1546524561001;
//# sourceMappingURL=1546524561001-CreateCustomerTable.js.map