// Core
import { Column, Entity, OneToOne } from 'typeorm';

// Entities
import { UserEntity } from '@/database/entities';
import { BaseEntity } from './base.entity';

@Entity('userbalances')
export class UserBalanceEntity extends BaseEntity {
  @Column({ name: 'userid', nullable: false, type: 'bigint', unsigned: true })
  userId: number;

  @Column({ name: 'amount', nullable: false, type: 'double precision' })
  amount: number;

  @OneToOne(() => UserEntity, (user) => user.balance, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
