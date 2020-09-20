import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { validate } from 'class-validator';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role_name: string;

  @ManyToMany(
    type => UserEntity,
    user => user.roles,
  )
  users: UserEntity[];
}
