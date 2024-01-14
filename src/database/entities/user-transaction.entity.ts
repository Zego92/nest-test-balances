// Core
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

// Entities
import { UserEntity } from '@/database/entities';
import { BaseEntity } from './base.entity';

@Entity('usertransactions')
export class UserTransactionEntity extends BaseEntity {
  @Column({ name: 'userid', nullable: false, type: 'bigint', unsigned: true })
  userId: number;

  @Column({ name: 'type', nullable: false, type: 'varchar', length: 20 })
  type: string;

  @Column({ name: 'amount', nullable: false, type: 'double precision' })
  amount: number;

  @Column({
    default: () => 'uuid_generate_v4()',
    name: 'transactionid',
    type: 'uuid',
    unique: true,
    nullable: false,
  })
  transactionId: string;

  @ManyToOne(() => UserEntity, (user) => user.transactions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userid' })
  user: UserEntity;
}
