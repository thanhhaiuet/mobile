import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColumnImageProduct1665422511839 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE`products` ADD  `image` varchar(200) null after `name`');
  }

  public async down(queryRunner: QueryRunner): Promise<void> { }
}
