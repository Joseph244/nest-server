import { Module } from '@nestjs/common';
import { GroupUserService } from './group-user.service';

@Module({
  providers: [GroupUserService]
})
export class GroupUserModule {}
