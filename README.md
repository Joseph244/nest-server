<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

### 框架需要什么功能？

1. - [x] 请求前后灵活的拦截器；并可支持接口的 web 安全 CROS；
2. - [x] 基础的 get,post 等请求处理；
3. - [x] 支持静态文件目录 public 与前端静态文件部署
4. - [x] 支持 cookies
5. - [x] 成熟稳定的 orm 框架：typeorm，sequelize,自动建表，更新表，建立表关联关系；queryBuilder 进行 sql 优化查询；typeorm 多表关联插入与查询；
6. - [x] 打包之后 node 部署使用:拷贝打包之后的 dist 文件夹到服务器，执行 node main.js;记得要将 node_modules 拷贝到和 dist 文件夹同级目录;
7. - [x] 支持独立的配置，自定义配置项，并可在打包之后修改；
8. - [x] 可支持 swagger 展示现有 api
9. - [x] 参数校验 class-validator

** 下面的还未实现 **

1. - [ ] 配置校验 Joi
2. - [ ] 事物操作与回滚，@Transaction()
3. - [ ] 支持接口数据的多种嵌套和自定义拼接
4. - [ ] 支持日志打印分类管理，方便问题排查
5. - [ ] 支持 websocket

具有文件上传插件

## Installation

```bash
由于依赖了bcrypt.js,在windows环境需要先用管理员身份运行命令行，并安装：
npm install --global --production windows-build-tools
npm i -g node-gyp

$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Build

由于部分依赖包有 linux 和 windows 下的环境区别，如果 windows 下开发移植到 linux 下部署遇到包报错，可尝试在 linux 下重新安装 node_modules

```bash
$ npm run build
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
