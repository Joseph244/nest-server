import {
  Controller,
  UseInterceptors,
  Post,
  Body,
  Get,
  Query,
  Delete,
  ClassSerializerInterceptor,
  ParseIntPipe,
  Param,
} from '@nestjs/common';

import { GroupService } from './group.service';
import { Group } from './group.entity';
import { LogInterceptor } from '../log.interceptor';
import { Result } from 'src/common/result.interface';
import { IdPipe } from 'src/common/pipes/id.pipe';

@UseInterceptors(LogInterceptor)
@Controller('group')
export class GroupController {
  constructor(public service: GroupService) {}

  @Post()
  async createUser(
    @Body() params: Group,
    @Body('parentId') parentId?: number,
  ): Promise<Result> {
    let parent = await this.service.findOneById(parentId);
    if (parent) {
      // parent不存在就表示加的是根节点
      params.parent = parent;
    }

    let data = await this.service.create(params);
    return { statusCode: 200, data, message: '创建成功' };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findTree(@Param('id', new IdPipe()) id): Promise<Result> {
    //  ParseIntPipe，它将一个字符串类型的数据转换成一个 int 类型，如果失败则抛出异常
    // async findTree(@Param('id', new ParseIntPipe()) id): Promise<Result> {
    // async findTree(@Query('id') id: number): Promise<Result> {
    let group = await this.service.findOneById(id);
    let data = await this.service.findDescendantsTree(group);
    return {
      statusCode: 200,
      data,
      message: '查询成功',
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('all')
  async findTrees(): Promise<Result> {
    let data = await this.service.findTrees();
    return {
      statusCode: 200,
      data,
      message: '查询成功',
    };
  }
  @Delete()
  async remove(@Query('id') id: number): Promise<Result> {
    // 方法1;
    let group = await this.service.findOneById(id);
    if (group) {
      let data = await this.service.remove(group);
      return {
        statusCode: 200,
        data,
        message: '删除成功',
      };
    } else {
      return {
        statusCode: 400,
        error: '要删除的元素不存在',
      };
    }

    // let data = await this.service.delete(id);
    // return {
    //   statusCode: 200,
    //   message: '删除成功',
    // };
  }
}
