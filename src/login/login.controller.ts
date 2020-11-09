import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  ClassSerializerInterceptor,
  UseInterceptors,
  HttpException,
  ParseIntPipe,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';

import { Result } from '../common/result.interface';
import { Login } from './login.entity';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(
    @Inject(LoginService) private readonly LoginService: LoginService,
  ) {}

  @Post('/add')
  async add(): Promise<Result> {
    const data = await this.LoginService.createUser({
      password: 'zzf1',
      username: 'zz1z',
    });
    return { statusCode: 200, message: '查询成功', data };
  }
  @Get('/all')
  async findAllUserInfo(): Promise<Result> {
    const data = await this.LoginService.findAll();
    return { statusCode: 200, message: '查询成功', data };
  }
}
