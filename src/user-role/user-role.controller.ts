import { Controller, Inject, Body, Post, Req } from '@nestjs/common';
import { Result } from '../common/result.interface';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { RoleService } from '../role/role.service';

@Controller('userRole')
export class UserRoleController {
  constructor(
    private userService: UserService,
    private roleService: RoleService,
  ) {}
  @Post()
  async createUserRole(
    @Body('account') account: string,
    @Body('username') username: string,
    @Body('pwd') pwd: string,
    @Body('status') status: number,
    @Body('roleIds') roleIds: number[],
  ): Promise<Result> {
    // let userData = await this.userService.findOneUserinfo(userId);
    let userData = new UserEntity({
      account: account,
      username: username,
      pwd: pwd,
      status: status,
    });

    let roles = await this.roleService.findByIds(roleIds);
    // 此处将角色和用户做关联（可以一对多），下面this.userService.createUser(userData)将会自动保存关联关系到中间表
    userData.roles = roles;
    await this.userService.createUser(userData);
    return { statusCode: 200, message: '创建成功' };
  }
}
