import { Body, Controller, Delete, Get, Module, Param, Patch, Post, Req } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserDto } from '../../dto/user.dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('entities/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("")
  @ApiResponse({
    status: 200,
    description: 'User Created Successfully',
    type: UserDto,
  })
  async userCreate(@Body() user:UserDto): Promise<UserDto> {
    return await this.userService.createUser(user);
  }
  @Get(":id")
  @ApiResponse({
    status: 200,
    description: 'User Found',
    type: UserDto,
  })
  @ApiParam({
    name: 'id',
    description: "The ID of the User",
    required: true,
    type: String,
  })
  async userRead(@Param() params:any): Promise<UserDto> {
    return await this.userService.readUser(params.id);
  }
  @Patch("")
  @ApiResponse({
    status: 200,
    description: 'User Updated successfully',
    type: UserDto,
  })
  async userUpdate(@Body() user:UserDto): Promise<UserDto> {
    return await this.userService.updateUser(user);
  }
  @Delete(":id")
  @ApiResponse({
    status: 200,
    description: 'User Deleted Successfully',
  })
  @ApiParam({
    name: 'id',
    description: "The ID of the User",
    required: true,
    type: String,
  })
  async userDelete(@Param() params:any): Promise<void> {
    await this.userService.deleteUser(params.id);
  }
}
