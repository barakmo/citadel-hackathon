import { User } from '../db/entity/user';

export class UserDto{
  userId:string;

  static fromUser(user:User):UserDto{
    const res:UserDto = new UserDto();

    res.userId = user.userId

    return res;
  }

  static toUser(dto:UserDto):User{
    const user = new User();
    user.userId = dto.userId;
    return user;
  }
}