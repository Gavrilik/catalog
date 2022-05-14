import { User } from './entities/user.entity';

export class UserDto {
  constructor(user: User) {
    const { password, rolesId, catalogs, ...rest } = user;
    Object.assign(this, rest);
  }
}

export class UserListDto {
  constructor(users: User[]) {
    const data = users.map((u) => new UserDto(u));
    Object.assign(this, { data, total: data.length });
  }
}
