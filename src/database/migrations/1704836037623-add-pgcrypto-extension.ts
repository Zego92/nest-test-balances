// Core
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPgcryptoExtension1705054694598 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS pgcrypto;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP EXTENSION IF EXISTS pgcrypto;`);
  }
}
