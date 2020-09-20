import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';

@Module({
  providers: [MenuService]
})
export class MenuModule {}
