import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableDonation1649695079351 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		return queryRunner.createTable(
			new Table({
				name: 'donations',
				columns: [
					{
						name: 'id',
						isPrimary: true,
						isUnique: true,
						type: 'varchar',
						length: '50',
					},
					{
						name: 'up_votes',
						type: 'varchar',
						length: '50',
					},
					{
						name: 'amount',
						type: 'int',
					},
					{
						name: 'method',
						type: 'varchar',
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
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
