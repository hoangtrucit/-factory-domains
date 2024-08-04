import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1705596019362 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      alter table public.account add username varchar;
      alter table public.account add dob date;
      alter table public.account add age numeric;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      alter table public.account drop column username;
      alter table public.account drop column dob;
      alter table public.account drop column age;
    `);
  }
}
