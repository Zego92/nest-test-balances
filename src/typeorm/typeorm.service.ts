// Core
import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      autoLoadEntities: true,
      database: this.config.get<string>('DATABASE_NAME'),
      entities: ['dist/database/entities/*.entity.{ts,js}'],
      host: this.config.get<string>('DATABASE_HOST'),
      logger: 'file',
      logging: 'all',
      metadataTableName: 'metadata',
      migrations: ['dist/database/migrations/*.{ts,js}'],
      migrationsTableName: 'migrations',
      name: this.config.get<string>('DATABASE_NAME'),
      password: this.config.get<string>('DATABASE_PASSWORD'),
      port: this.config.get<number>('DATABASE_PORT'),
      schema: 'public',
      subscribers: ['dist/database/subscribers/**/*.{ts,js}'],
      synchronize: false,
      type: 'postgres',
      useUTC: true,
      username: this.config.get<string>('DATABASE_USER'),
    };
  }
}
