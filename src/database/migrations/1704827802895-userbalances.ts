// Core
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Userbalances1704827802895 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'userbalances',
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
            isUnique: true,
            name: 'userid',
            type: 'bigint',
            unsigned: true,
          },
          {
            default: 0,
            isNullable: false,
            name: 'amount',
            type: 'double precision',
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
      'userbalances',
      new TableForeignKey({
        columnNames: ['userid'],
        referencedTableName: 'users',
        onDelete: 'cascade',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('userbalances', true);
  }
}
