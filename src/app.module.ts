import * as path from 'path';
import { Module } from '@nestjs/common';
import { createConnection } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorsInterceptor } from './common/interceptors/errors.interceptor';
import { UserModule } from './user/user.module';
import { CatModule } from './cat/cat.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { GroupController } from './group/group.controller';
import { GroupModule } from './group/group.module';
import { GroupRoleService } from './group-role/group-role.service';
import { GroupRoleModule } from './group-role/group-role.module';
import { GroupUserController } from './group-user/group-user.controller';
import { GroupUserModule } from './group-user/group-user.module';
import { RoleController } from './role/role.controller';
import { RoleModule } from './role/role.module';
import { RoleService } from './role/role.service';
import { UserRoleController } from './user-role/user-role.controller';
import { UserRoleModule } from './user-role/user-role.module';
import { MenuController } from './menu/menu.controller';

import config from './config';
import { UserService } from './user/user.service';

import { loginProviders } from './login/login.providers';
import { LoginController } from './login/login.controller';
import { LoginModule } from './login/login.module';
import { LoginService } from './login/login.service';
import { databaseProviders } from './database/database.providers';

// TypeOrmModule.forRoot() 默认加载项目根目录下的 ormconfig.json 配置文件用于配置数据库连接
// TypeORM 配置文件详细文档 https://typeorm.io/#/using-ormconfig

/**
 * @Module() 定义一个模块，并管理这个模块的导入集合、控制器集合、提供者集合、导出集合
 * 整个Module都是下面AppModule的装饰
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config], //配置为全局可见，否则需要在每个模块中单独导入ConfigModule
      ignoreEnvFile: false,
      //忽略配置文件，为true则仅读取操作系统环境变量，常用于生产环境
      envFilePath: ['.env', '.env.production', '.env.development'],
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => {
    //     return {
    //       type: 'postgres',
    //       host: configService.get('DB_CONFIG.host'),
    //       port: configService.get('DB_CONFIG.port'),
    //       username: configService.get('DB_CONFIG.username'),
    //       password: configService.get('DB_CONFIG.password'),
    //       database: configService.get('DB_CONFIG.database'),
    //       synchronize: configService.get('DB_CONFIG.synchronize'),
    //       logging: configService.get('DB_CONFIG.logging'),
    //       entities: [path.join(__dirname, '**/*.entity{.ts,.js}')],
    //     };
    //   },
    // }),
    // 写死方式
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: '123456',
    //   database: 'nest',
    //   synchronize: true,
    //   logging: true,
    //   entities: [path.join(__dirname, '**/*.entity{.ts,.js}')],
    // }),
    // UserModule,
    // CatModule,
    // PokemonModule,
    // GroupModule,
    // GroupRoleModule,
    // GroupUserModule,
    // RoleModule,
    // UserRoleModule,

    LoginModule,
  ], // 导入其他模块的集合
  controllers: [
    AppController,
    // GroupController,
    // GroupUserController,
    // RoleController,
    // UserRoleController,
    // MenuController,
    LoginController,
  ],
  // 这里使用的是 APP_INTERCEPTOR 来标识提供者是一个 拦截器，如果是管道则用 APP_PIPE。
  providers: [
    // 在 main.ts 里面，使用 app 上的 UseGlobalInterceptors 方法，把一个拦截器实例交给这个方法就可以了，不过这样做的话就不能在拦截器里注入依赖了，所以可以使用下面的方法
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor, // 全局拦截器
    },
    ...loginProviders,
    ...databaseProviders,
    AppService,
    // UserService,
    // RoleService,
    // GroupRoleService,
    LoginService,
  ],
})
export class AppModule {}
