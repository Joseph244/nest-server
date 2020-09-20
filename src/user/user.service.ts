import {
  HttpException,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';

import { UserEntity } from './user.entity';
import { UpdatePasswordDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>, // 使用泛型注入对应类型的存储库实例
  ) {}

  /**
   * 创建
   *
   * @param userinfo userinfo 实体对象
   */
  async createUser(userinfo: UserEntity): Promise<UserEntity> {
    const { account } = userinfo;
    const user = await this.repo.findOne({ account });

    if (user) {
      throw new BadRequestException('用户已存在');
    }
    !userinfo.pwd ? (userinfo.pwd = '123456') : '';
    /**
     * 创建新的实体实例，将此对象的所有实体属性复制到新实体中。 请注意，它仅复制实体模型中存在的属性。
     */
    const entity = this.repo.create(userinfo);
    return this.repo.save(entity);

    /**
     * 将给定实体插入数据库。与save方法不同，执行原始操作时不包括级联，关系和其他操作。
     * 执行快速有效的INSERT操作。不检查数据库中是否存在实体，因此如果插入重复实体，本次操作将失败。
     */
    // await this.repo.insert(userinfo);
  }

  /**
   * 删除
   *
   * @param id ID
   */
  async deleteUserInfo(id: string): Promise<void> {
    await this.findOneById(id);
    this.repo.delete(id);
  }

  /**
   * 更新
   *
   * @param userinfo userinfo 实体对象
   */
  async updateUserInfo(id: string, userinfo: UserEntity): Promise<void> {
    const existuserinfo = await this.findOneById(id);
    // 当传入空数据时，避免覆盖原数据
    let param = {
      ...existuserinfo,
      ...userinfo,
    };
    this.repo.save(param);

    // this.repo.update(id, userinfo);
    // await getConnection()
    //   .createQueryBuilder()
    //   .update(UserInfo)
    //   .set({ account: 'fuck' })
    //   .where('id = :id', { id: id })
    //   .execute();
  }

  /**
   * 根据ID查询
   *
   * @param id ID
   */
  async findOneUserinfo(id: string): Promise<UserEntity> {
    const entity = this.findOneById(id);
    if (!entity) {
      throw new NotFoundException('没找到用户。');
    }

    return entity;
  }

  async findAllUserinfo(): Promise<UserEntity[]> {
    const list = await this.repo.find({ relations: ['roles'] });
    return list;
  }

  async findByIds(ids: string[]): Promise<UserEntity[]> {
    const list = await this.repo.findByIds(ids);
    return list;
  }

  /**
   * 根据ID查询单个信息，如果不存在则抛出404异常
   * @param id ID
   */
  private async findOneById(id: string): Promise<UserEntity> {
    const userInfo = await this.repo.findOne(id, {
      relations: ['roles'],
    });
    if (!userInfo) {
      throw new HttpException(`指定 id=${id} 的用户不存在`, 404);
    }
    return userInfo;
  }

  async updatePassword(id: string, data: UpdatePasswordDto) {
    const { pwd, newPwd } = data;
    const entity = await this.repo.findOne(id);

    if (!entity) {
      throw new NotFoundException('改用户不存在');
    }
    // 先比较原密码是否正确
    const pass = await entity.comparePassword(pwd);

    if (!pass) {
      throw new BadRequestException('密码验证失败，请重新输入正确的密码。');
    }

    entity.pwd = newPwd;

    return await this.repo.save(entity);
  }
}
