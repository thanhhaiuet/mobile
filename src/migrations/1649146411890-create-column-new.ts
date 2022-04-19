import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createColumnNew1649146411890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(
      new Table({
        name: 'news',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            isUnique: true,
            type: 'varchar',
            length: '50',
          },
          {
            name: 'author',
            type: 'varchar',
            length: '512',
          },
          {
            name: 'title',
            type: 'varchar',
            length: '512',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'content',
            type: 'text',
          },
          {
            name: 'source',
            type: 'json',
          },
          {
            name: 'url',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'urlToImage',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'categoryId',
            type: 'int',
          },
          {
            name: 'publishedAt',
            type: 'datetime',
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
