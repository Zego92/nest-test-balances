// Core
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Usertransactions1704827809506 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'usertransactions',
        columns: [
          {
            generationStrategy: 'increment',
            isGenerated: true,
            isNullable: false,
            isPrimary: true,
            isUnique: true,
            name: 'id',
            type: 'bigint',
          },
          {
            isNullable: false,
            name: 'userid',
            type: 'bigint',
            unsigned: true,
          },
          {
            isNullable: false,
            length: '20',
            name: 'type',
            type: 'varchar',
          },
          {
            isNullable: false,
            name: 'amount',
            type: 'double precision',
          },
          {
            default: 'uuid_generate_v4()',
            isGenerated: true,
            isUnique: true,
            name: 'transactionid',
            type: 'uuid',
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

    await queryRunner.createForeignKey(
      'usertransactions',
      new TableForeignKey({
        columnNames: ['userid'],
        referencedTableName: 'users',
        onDelete: 'cascade',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('usertransactions', true);
  }
}
