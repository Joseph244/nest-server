import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService extends TypeOrmCrudService<Role> {
  constructor(@InjectRepository(Role) repo) {
    super(repo);
  }

  public async findOneById(id: number): Promise<Role> {
    const userInfo = await this.repo.findOne(id);
    if (!userInfo) {
      throw new HttpException(`当前查询角色不存在`, 404);
    }
    return userInfo;
  }

  async findByIds(ids: number[]): Promise<Role[]> {
    const list = await this.repo.findByIds(ids);
    return list;
  }
}
