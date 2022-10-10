import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createEstimateTable1665325696519 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		return queryRunner.createTable(
			new Table({
				name: 'estimates',
				columns: [
					{
						name: 'id',
						isPrimary: true,
						isUnique: true,
						type: 'varchar',
						length: '50',
					},
					{
						name: 'user_id',
						type: 'varchar',
						length: '50',
					},
					{
						name: 'product_id',
						type: 'varchar',
						length: '50',
					},
					{
						name: 'price',
						type: 'int',
					},
					{
						name: 'time_complete',
						type: 'int',
					},
					{
						name: 'is_choose',
						type: 'boolean',
					},
					{
						name: 'created_at',
						type: 'datetime',
						default: 'CURRENT_TIMESTAMP',
					},
					{
						name: 'updated_at',
						type: 'datetime',
						default: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
					},
					{
						name: 'deleted_at',
						type: 'datetime',
						isNullable: true,
					},
				],
				foreignKeys: [
					{
						columnNames: ['user_id'],
						referencedColumnNames: ['id'],
						referencedTableName: 'users',
						name: 'estimate-users',
					},
					{
						columnNames: ['product_id'],
						referencedColumnNames: ['id'],
						referencedTableName: 'products',
						name: 'estimate-products',
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
