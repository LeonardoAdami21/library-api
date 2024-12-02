import { DataSource, DataSourceOptions } from 'typeorm';

const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: './db.sqlite',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
  logging: true,
  migrationsTransactionMode: 'each',
};

export const dataSource = new DataSource(dataSourceOptions);
