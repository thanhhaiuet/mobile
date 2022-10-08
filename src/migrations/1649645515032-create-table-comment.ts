import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableComment1649645515032 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(
      new Table({
        name: 'comments',
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
            name: 'user_receive_id',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'time_complete',
            type: 'datetime',
          },
          {
            name: 'status',
            type: 'tinyint'
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

  public async down(queryRunner: QueryRunner): Promise<void> { }
}
