import { Inject, Injectable, Logger, Module, NotFoundException } from '@nestjs/common';
import { CrudStrategy } from '../../strategies/crud.strategy';
import { UserDto } from '../../dto/user.dto';
import { User } from '../../db/entity/user';


@Injectable()
export class UserService {
  constructor(
    @Inject('CRUD_PROVIDER')
    private crud: CrudStrategy,
  ) {}

  async getAllUsers(): Promise<UserDto[]> {
    const users = await this.crud.readAllWithRelations<User>('User', {}, []);
    return users.map(user => UserDto.fromUser(user));
  }
  async createUser(userDto:UserDto):Promise<UserDto> {
    Logger.log("Create User",userDto);
    const newUser = UserDto.toUser(userDto);
    const user = await this.crud.create<User>(newUser);
    if (!user) {
      throw new NotFoundException('User not Created');
    }
    return UserDto.fromUser(user);
  }
  async readUser(id:string):Promise<UserDto> {
    const search = new User();
    search.userId = id;
    const user = await this.crud.read<User>(search);
    if (!user || search.userId !== id) {
      throw new NotFoundException('User not found');
    }
    return UserDto.fromUser(user);
  }
  async updateUser(userDto:UserDto):Promise<UserDto> {
    const user = await this.crud.update<User>(UserDto.toUser(userDto));
    if (!user || user.userId !== userDto.userId) {
      throw new NotFoundException('User not found');
    }
    return UserDto.fromUser(user);
  }
  async deleteUser(id:string):Promise<void> {
    const search = new User();
    search.userId = id;
    const user = await this.crud.read<User>(search);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.crud.delete<User>(user);
  }
}
