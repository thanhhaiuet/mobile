import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createColumnUsers1649146472616 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            isUnique: true,
            type: 'varchar',
            length: '50',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'username',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'privacy_updated_times',
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
