import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRoleController } from './user-role.controller';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Role } from '../role/role.entity';
import { RoleService } from '../role/role.service';

@Module({
  // 要想在当前的userRoleController中使用userService和roleService的方法，需要在此处导入
  imports: [TypeOrmModule.forFeature([UserEntity, Role])],
  controllers: [UserRoleController],
  providers: [UserService, RoleService],
  exports: [TypeOrmModule],
})
export class UserRoleModule {}
