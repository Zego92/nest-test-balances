// Core
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @CreateDateColumn({ name: 'createdat', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedat', type: 'timestamp' })
  updatedAt: Date;
}
