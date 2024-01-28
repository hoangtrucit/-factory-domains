import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1705596019362 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      alter table "user" add username varchar;
      alter table "user" add dob date;
      alter table "user" add age numeric;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      alter table "user" drop column username;
      alter table "user" drop column dob;
      alter table "user" drop column age;
    `);
  }
}
