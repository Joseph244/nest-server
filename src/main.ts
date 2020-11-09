import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';

import { HttpExceptionFilter } from './common/filters/http-exception.filter';

import { join } from 'path';
import { ApiParamsValidationPipe } from './common/pipes/api-params-validation.pipe';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors(); // 跨源资源共享（CORS）
  // app.use(helmet()); // 通过适当地设置HTTP标头，头盔可以帮助保护您的应用免受一些众所周知的Web漏洞的影响
  // app.use(csurf()); // 避免跨站点请求伪造（称为CSRF或XSRF）--- 建议部署模式使用，否则开发模式将无法使用
  // app.use(
  //   rateLimit({
  //     windowMs: 15 * 60 * 1000, // 15 minutes
  //     max: 100, // limit each IP to 100 requests per windowMs
  //   }),
  // ); // 为了保护应用程序免受暴力攻击，实现某种速率限制。

  app.use(compression()); // 启用gzip压缩
  app.use(cookieParser());
  app.useStaticAssets(join(__dirname, '..', 'public')); // 静态文件目录
  // 静态文件目录使用别名
  // app.useStaticAssets(join(__dirname, '..', 'public'), {
  //   prefix: '/static',
  // });
  app.useStaticAssets(join(__dirname, '..', 'views')); // 单页应s用不需要模版引擎，默认会查找下面的index.html
  // ssr 服务端渲染模版引擎与文件地址
  app.setBaseViewsDir(join(__dirname, '..', 'viewEngine'));
  app.setBaseViewsDir('viewEngine');
  app.setViewEngine('ejs');

  app.useGlobalPipes(new ApiParamsValidationPipe()); // 先执行pipe处理输入参数
  app.useGlobalFilters(new HttpExceptionFilter()); // 后执行filter过滤执行结果
  //   拦截器和异常过滤器有什么差别？
  // 首先，时机不同，拦截器的执行顺序在异常过滤器之前，这意味着拦截器抛出的错误，最后可经由过滤器处理；其次，对象不同，拦截器捕获的是routeHandler抛出的所有异常，而异常过滤器可通过@Catch(SomeException)来捕获特定的异常。
  console.info(
    `environment::: ${process.env.NODE_ENV},server run at::: ${process.env.PORT}`,
  );
  const options = new DocumentBuilder()
    .setTitle('Nest Demo')
    .setDescription('The Nest API description')
    .setVersion('1.0')
    .addTag('Nest Swagger')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
