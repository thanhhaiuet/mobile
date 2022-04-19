import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableNewDraft1649645206596 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(
      new Table({
        name: 'new_drafts',
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
            isUnique: true,
            type: 'varchar',
            length: '50',
          },
          {
            name: 'new_id',
            isUnique: true,
            type: 'varchar',
            length: '50',
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
            name: 'new-draft-users',
          },
          {
            columnNames: ['new_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'news',
            name: 'new-draft-news',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
