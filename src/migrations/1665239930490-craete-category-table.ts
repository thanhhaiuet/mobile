import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { ETableName } from '@constants/entity.constants';

export class craeteCategoryTable1665239930490 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		return queryRunner.createTable(
			new Table({
				name: ETableName.CATEGORIES,
				columns: [
					{
						name: 'id',
						isPrimary: true,
						isUnique: true,
						type: 'varchar',
						length: '50',
					},
					{
						name: 'parent_id',
						length: '50',
						type: 'varchar',
						default: null,
						isNullable: true,
					},
					{
						name: 'name',
						type: 'varchar',
						length: '255',
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
						name: `${ETableName.CATEGORIES}-${ETableName.CATEGORIES}`,
						referencedColumnNames: ['id'],
						referencedTableName: ETableName.CATEGORIES,
						columnNames: ['parent_id'],
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
