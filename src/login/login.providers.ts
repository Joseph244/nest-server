// login/login.providers.ts
import { Connection, getMongoRepository } from 'typeorm';
import { Login } from './login.entity';

export const loginProviders = [
  {
    // Token可以自己设定
    provide: 'LoginRepositoryToken',
    // User是entity定义的数据实体
    useFactory: (connection: Connection) =>
      connection.getMongoRepository(Login),
    inject: ['DbConnectionToken'],
  },
];
