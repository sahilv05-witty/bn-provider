import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config({ path: `${__dirname}/.env.${process.env.NODE_ENV}` });

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: +configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: ['./src/**/*.entity.ts'],
  migrations: ['./migrations/*.ts'],
  migrationsTableName: 'migrations_typeorm',
});
