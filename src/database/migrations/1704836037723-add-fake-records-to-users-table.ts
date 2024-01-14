// Core
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFakeRecordsToUsersTable1704836037723
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO users (firstname, lastname, email, password)
        VALUES
        ('John', 'Doe', 'john.doe@example.com', crypt('password1', gen_salt('bf', 10))),
        ('Jane', 'Doe', 'jane.doe@example.com', crypt('password2', gen_salt('bf', 10))),
        ('Alice', 'Smith', 'alice.smith@example.com', crypt('password3', gen_salt('bf', 10))),
        ('Bob', 'Johnson', 'bob.johnson@example.com', crypt('password1', gen_salt('bf', 10))),
        ('Eva', 'Davis', 'eva.davis@example.com', crypt('password4', gen_salt('bf', 10))),
        ('Alex', 'Wilson', 'alex.wilson@example.com', crypt('password5', gen_salt('bf', 10))),
        ('Sophia', 'Brown', 'sophia.brown@example.com', crypt('password6', gen_salt('bf', 10))),
        ('William', 'Taylor', 'william.taylor@example.com', crypt('password7', gen_salt('bf', 10))),
        ('Olivia', 'Jones', 'olivia.jones@example.com', crypt('password8', gen_salt('bf', 10))),
        ('Daniel', 'Moore', 'daniel.moore@example.com', crypt('password9', gen_salt('bf', 10))),
        ('Emily', 'Clark', 'emily.clark@example.com', crypt('password10', gen_salt('bf', 10))),
        ('Michael', 'Hill', 'michael.hill@example.com', crypt('password11', gen_salt('bf', 10))),
        ('Abigail', 'Green', 'abigail.green@example.com', crypt('password12', gen_salt('bf', 10))),
        ('David', 'Allen', 'david.allen@example.com', crypt('password13', gen_salt('bf', 10))),
        ('Emma', 'White', 'emma.white@example.com', crypt('password14', gen_salt('bf', 10))),
        ('Sophie', 'Hall', 'sophie.hall@example.com', crypt('password15', gen_salt('bf', 10))),
        ('Benjamin', 'Young', 'benjamin.young@example.com', crypt('password16', gen_salt('bf', 10))),
        ('Lily', 'Walker', 'lily.walker@example.com', crypt('password17', gen_salt('bf', 10))),
        ('Aiden', 'Carter', 'aiden.carter@example.com', crypt('password18', gen_salt('bf', 10))),
        ('Grace', 'Adams', 'grace.adams@example.com', crypt('password19', gen_salt('bf', 10)));
    `);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
