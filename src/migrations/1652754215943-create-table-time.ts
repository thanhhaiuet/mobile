import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableTime1652754215943 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		return queryRunner.createTable(
			new Table({
				name: 'times',
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
						name: 'time_start',
						type: 'datetime',
					},
					{
						name: 'dayOfWeek',
						type: 'int',
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
						name: 'time-users',
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
