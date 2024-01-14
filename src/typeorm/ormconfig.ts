// Core
import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

const options: DataSourceOptions = {
  database: process.env.DATABASE_NAME,
  entities: ['dist/database/entities/*.entity.{ts,js}'],
  host: process.env.DATABASE_HOST,
  logger: 'file',
  logging: 'all',
  metadataTableName: 'metadata',
  migrations: ['dist/database/migrations/*.{ts,js}'],
  migrationsTableName: 'migrations',
  name: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: +process.env.DATABASE_PORT,
  schema: 'public',
  subscribers: ['dist/database/subscribers/**/*.{ts,js}'],
  synchronize: false,
  type: 'postgres',
  useUTC: true,
  username: process.env.DATABASE_USER,
};

export const connectionSource = new DataSource(options);
