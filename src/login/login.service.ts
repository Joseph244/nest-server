import { Injectable, Inject } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { Login } from './login.entity';

@Injectable()
export class LoginService {
  constructor(
    // Token要对应
    @Inject('LoginRepositoryToken')
    private readonly loginRepository: MongoRepository<Login>,
  ) {}
  // 数据库的操作交给service来提供
  async findAll(): Promise<Login[]> {
    return await this.loginRepository.find();
  }

  async createUser(userinfo: info): Promise<Login> {
    const entity = this.loginRepository.create(userinfo);
    return this.loginRepository.save(entity);
  }
}
class info {
  public username: string;
  public password: string;
}
