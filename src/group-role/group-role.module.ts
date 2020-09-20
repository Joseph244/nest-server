import { Module } from '@nestjs/common';
import { GroupRoleController } from './group-role.controller';

@Module({
  controllers: [GroupRoleController]
})
export class GroupRoleModule {}
