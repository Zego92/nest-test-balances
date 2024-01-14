// Core
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Users1704826864815 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            generationStrategy: 'increment',
            isGenerated: true,
            isNullable: false,
            isPrimary: true,
            isUnique: true,
            name: 'id',
            type: 'bigint',
            unsigned: true,
          },
          {
            isNullable: false,
            length: '255',
            name: 'firstname',
            type: 'varchar',
          },
          {
            isNullable: false,
            length: '255',
            name: 'lastname',
            type: 'varchar',
          },
          {
            isNullable: false,
            isUnique: true,
            length: '255',
            name: 'email',
            type: 'varchar',
          },
          {
            isNullable: false,
            length: '255',
            name: 'password',
            type: 'varchar',
          },
          {
            default: 'now()',
            name: 'createdat',
            type: 'timestamp with time zone',
          },
          {
            default: 'now()',
            name: 'updatedat',
            type: 'timestamp with time zone',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users', true);
  }
}
