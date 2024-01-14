// Core
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

// Entities
import { UserBalanceEntity, UserTransactionEntity } from '@/database/entities';
import { BaseEntity } from './base.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({
    length: '255',
    name: 'firstname',
    nullable: false,
    type: 'varchar',
  })
  firstName: string;

  @Column({
    length: '255',
    name: 'lastname',
    nullable: false,
    type: 'varchar',
  })
  lastName: string;

  @Column({
    length: '255',
    name: 'email',
    nullable: false,
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column({
    length: '255',
    name: 'password',
    nullable: false,
    select: true,
    type: 'varchar',
  })
  password: string;

  @OneToOne(() => UserBalanceEntity, (balance) => balance.user, {
    nullable: false,
    cascade: true,
    onDelete: 'CASCADE',
  })
  balance: UserBalanceEntity;

  @OneToMany(() => UserTransactionEntity, (transaction) => transaction.user, {
    nullable: false,
    cascade: true,
    onDelete: 'CASCADE',
  })
  transactions: UserTransactionEntity[];
}
