import { Role } from '../role/role.entity';

export class UserDto {
  readonly name: string;
  readonly pwd: string;
  readonly roles: Role[];
}

export class UpdatePasswordDto {
  readonly pwd: string;
  readonly newPwd: string;
}
