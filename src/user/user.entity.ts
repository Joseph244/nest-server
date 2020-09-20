import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinTable,
  ManyToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Role } from '../role/role.entity';
import * as bcrypt from 'bcrypt';
import {
  validate,
  validateOrReject,
  Contains,
  IsInt,
  IsNotEmpty,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
} from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({
    comment: '账号',
    unique: true,
    type: 'varchar',
  })
  @Length(3, 20)
  account: string;

  @Column({
    comment: '用户姓名',
    nullable: false,
    update: true,
  })
  @IsNotEmpty({ message: '姓名不可为空' })
  @Length(1, 10)
  username: string;

  // @Exclude({
  //   toClassOnly: true,
  //   toPlainOnly: true,
  // }) // TODO 排除装饰器有问题
  @Exclude()
  @Column({
    comment: '密码',
    // select: false, // 查询结果是否返回该字段
  })
  pwd: string;

  @CreateDateColumn({
    comment: '创建时间',
  })
  create_time: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  update_time: Date;

  @Column({
    comment: '账号过期时间',
    nullable: true, // 可以为空
  })
  expire_time: string;

  @Column({
    comment: '账号状态',
    type: 'int',
    default: 0,
    enum: [0, 1, 2],
  })
  status: number;

  @Column({
    comment: '描述信息',
    type: 'json',
    nullable: true,
  })
  desc: any;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPwd() {
    this.pwd = await bcrypt.hash(this.pwd, 12);
  }
  // 比较密码
  async comparePassword(pwd: string) {
    console.log(this.account, '111111111');
    return await bcrypt.compare(pwd, this.pwd);
  }
  @ManyToMany(
    type => Role,
    role => role.users,
  )
  @JoinTable()
  roles: Role[];

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
