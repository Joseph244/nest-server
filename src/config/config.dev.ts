export default {
  DB_CONFIG: {
    // pg数据库配置
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123456',
    database: 'nest',
    synchronize: true,
    logging: true,
    entities: ['**/*.entity{.ts,.js}'],
  },
};
