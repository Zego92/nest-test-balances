// Core
import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from 'typeorm';
import { genSalt, hash } from 'bcrypt';

// Entities
import { UserEntity } from '@/database/entities';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
  listenTo(): CallableFunction | string {
    return UserEntity;
  }

  async beforeInsert(event: InsertEvent<UserEntity>): Promise<void> {
    const { entity } = event;

    const salt = await genSalt(10);

    entity.password = await hash(entity.password, salt);
  }
}
