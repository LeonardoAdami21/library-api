import { DataSource } from 'typeorm';
import { DATA_SOURCE } from './datasource.provider';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'sqlite',
        database: './db.sqlite',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false,
        logging: true,
      });
      return dataSource.initialize();
    },
  },
];
