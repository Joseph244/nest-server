import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {} // 将配置注入模块中
  getHello(): Object {
    return {
      msg: 'Hello World!1',
      name: this.configService.get<string>('DB_CONFIG.host'), // 获取环境变量的配置项内容
      config: process.env.PG_PORT,
    };
  }
}
