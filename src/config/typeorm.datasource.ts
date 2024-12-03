import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const dataSourceOptions: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: './db.sqlite',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
