import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateOrderTotalTable1546581429998 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'order_total',
            columns: [
                {
                    name: 'order_total_id',
                    type: 'integer',
                    length: '11',
                    isGenerated: true,
                    generationStrategy: 'increment',
                    isPrimary: true,
                    isNullable: false,
                }, {
                    name: 'order_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'code',
                    type: 'varchar',
                    length: '32',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'title',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'text',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'value',
                    type: 'DECIMAL(15,4)',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'sort_order',
                    type: 'integer',
                    length: '3',
                    isPrimary: false,
                    isNullable: false,
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
                    default:  'CURRENT_TIMESTAMP',
                }, {
                    name: 'modified_date',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: true,
                    default:  'CURRENT_TIMESTAMP',
                },
            ],
        });
        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('order_total');
    }
}
