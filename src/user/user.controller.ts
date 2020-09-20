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
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UpdatePasswordDto } from './user.dto';
import { ApiException } from 'src/common/exceptions/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('userinfo')
export class UserInfoController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userinfo: UserEntity) {
    return await this.userService.createUser(userinfo);
  }

  @Delete(':id')
  async deleteUserInfo(@Param('id') id: string): Promise<Result> {
    await this.userService.deleteUserInfo(id);
    return { statusCode: 200, message: '删除成功' };
  }

  @Put(':id')
  async updateUserInfo(
    @Param('id') id: string,
    @Body() userinfo: UserEntity,
  ): Promise<Result> {
    await this.userService.updateUserInfo(id, userinfo);
    return { statusCode: 200, message: '更新成功' };
  }

  @Put(':id/password')
  @UseInterceptors(ClassSerializerInterceptor)
  async updatePassword(
    @Param('id') id: string,
    @Body() data: UpdatePasswordDto,
  ) {
    throw new ApiException(
      '用户ID无效',
      ApiErrorCode.USER_ID_INVALID,
      HttpStatus.BAD_REQUEST,
    );
    return await this.userService.updatePassword(id, data);
  }
  // 需注意路由匹配是按照先后顺序的，所以装饰器顺序很重要

  @Get('/all')
  @UseGuards(AuthGuard)
  async findAllUserInfo(): Promise<Result> {
    const data = await this.userService.findAllUserinfo();
    return { statusCode: 200, message: '查询成功', data };
  }

  @UseInterceptors(ClassSerializerInterceptor) // 返回值类型为UserEntity,此时可以生效
  @Get(':id')
  async findOneUserInfo(@Param('id') id: string): Promise<UserEntity> {
    return await this.userService.findOneUserinfo(id);
  }

  @UseInterceptors(ClassSerializerInterceptor) // 此时由于包装成Result对象，所以@Exclude无法生效
  @Get()
  async findOneUser(@Query('id') id: string): Promise<Result> {
    const data = await this.userService.findOneUserinfo(id);
    return { statusCode: 200, message: '查询成功', data };
  }
}
// 手动抛出异常
// throw new ApiException(
//   '用户ID无效',
//   ApiErrorCode.USER_ID_INVALID,
//   HttpStatus.BAD_REQUEST,
// );
