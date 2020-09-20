import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  TreeRepository,
  QueryBuilder,
  DeleteResult,
} from 'typeorm';
import { Group } from './group.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly repo: TreeRepository<Group>, // 使用泛型注入对应类型的存储库实例
  ) {}
  async create(params: Group): Promise<Group> {
    return this.repo.save(params);
  }

  async findOneById(id: number): Promise<Group> {
    const info = await this.repo.findOne(id);
    return info;
  }
  // 查询后代树结构
  async findDescendantsTree(params: Group): Promise<Group> {
    const info = await this.repo.findDescendantsTree(params);
    return info;
  }
  // 查询全部树结构
  async findTrees(): Promise<Group[]> {
    const info = await this.repo.findTrees();
    return info;
  }
  // 查询所有根节点
  async findRoots(): Promise<Group[]> {
    const info = await this.repo.findRoots();
    return info;
  }
  // 删除一个节点:方法1
  async delete(params: number): Promise<DeleteResult> {
    const info = await this.repo.delete(params);
    return info;
  }

  // 删除一个节点:方法2
  async remove(params: Group): Promise<Group> {
    const info = await this.repo.remove(params);
    return info;
  }
}
