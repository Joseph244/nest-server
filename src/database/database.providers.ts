import { createConnection } from 'typeorm';
import * as path from 'path';

export const databaseProviders = [
  {
    // Token可以自己设定
    provide: 'DbConnectionToken',
    useFactory: async () =>
      await createConnection({
        type: 'mongodb',
        host: 'localhost',
        port: 27017,
        // username: '',
        // password: '',
        database: 'test',
        entities: [path.join(__dirname, '../**/*.entity{.ts,.js}')],
      }),
  },
];
