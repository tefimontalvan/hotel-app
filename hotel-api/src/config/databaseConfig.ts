import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
require('dotenv').config();

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.HOST,
  port: 4000,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  url: process.env.URL,
  autoLoadEntities: true,
  synchronize: false,
  entities: [process.env.ENTITIES],
  migrations: [process.env.MIGRATIONS],
  cli: {
    entitiesDir: process.env.ENTITIES_DIR,
    migrationsDir: process.env.MIGRATIONS_DIR,
  },
};
