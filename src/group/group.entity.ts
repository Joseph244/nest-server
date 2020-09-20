import {
  Entity,
  Tree,
  Column,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
  TreeLevelColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Transform } from 'class-transformer';

// 树形递归结构表定义，查询请查看groupServices
@Entity()
@Tree('closure-table')
export class Group {
  @PrimaryGeneratedColumn()
  @Transform(value => `groupId: ${value}`)
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @TreeChildren({ cascade: true })
  children: Group[];
  @TreeParent()
  parent: Group;
  @Exclude()
  @CreateDateColumn({
    comment: '创建时间',
  })
  create_time: Date;
  @Exclude()
  @UpdateDateColumn({
    comment: '更新时间',
  })
  update_time: Date;
  // @TreeLevelColumn()
  // level: number;
}
