import {
  Controller,
  Get,
  Post,
  Header,
  Headers,
  Req,
  Res,
  Body,
  Param,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { View } from './common/libs/view';

interface CreateArticleDto {
  title: string;
  content: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('hai')
  index(): Object {
    return this.appService.getHello();
  }

  // 特定库模式+渲染视图引擎
  @Get('hello')
  getHello(@Req() req: Request, @Res() res: Response) {
    const { from } = req.query;
    // 设置cookies
    res.cookie('name', 'zhangsan', { maxAge: 900000, httpOnly: true });
    // 1.原生写法
    return res.render('index.ejs', { hello: 'ejs hello world!' }); // 第一个参数是加载的视图文件，第二个参数是在ejs中渲染的数据json
  }

  @Get('getCookies')
  getCookies(@Req() req) {
    // 获取cookies
    return req.cookies.name;
  }

  @Post('createArticle')
  async create(@Body() article: CreateArticleDto) {
    return article;
  }

  @Get('test')
  @Header('x-my-resp', '123') // 添加的请求头
  test(@Headers('x-my-val') myHeaderVal: string) {
    // @Headers('x-my-val') 获取请求中的请求头参数
    return `x-my-val is ${myHeaderVal}`;
  }
}
