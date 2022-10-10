import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class craeteProductTable1665245613853 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		return queryRunner.createTable(
			new Table({
				name: 'products',
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
						name: 'name',
						type: 'varchar',
						length: '500',
					},
					{
						name: 'description',
						type: 'text',
					},
					{
						name: 'time_complete',
						type: 'int',
					},
					{
						name: 'price_start',
						type: 'int',
					},
					{
						name: 'price_end',
						type: 'int',
					},
					{
						name: 'status',
						type: 'tinyint',
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
						name: 'product-users',
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
