import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { InputUserDto } from './dto/input-user.dto';
import { UsersService } from './users.service';
import { User } from './entity/user.entity';
// import { UserRequestPipe } from './pipe/user-status.pipe';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // GET - /users
  @Get()
  getAllUser(): Promise<User[]> {
    return this.usersService.getAllUser();
  }

  // GET - /users/:userId
  @Get('/:userId')
  getOneUser(@Param('userId') userId: string): Promise<User> {
    return this.usersService.getOneUser(userId);
  }

  // POST - /users
  @Post()
  // InputUserDtoで定義した@IsNotEmpty()が有効になる
  @UsePipes(ValidationPipe)
  createUser(@Body() UserDto: InputUserDto): Promise<User> {
    return this.usersService.createUser(UserDto);
  }

  // PATCH - /users/[userId]
  @Patch('/:userId')
  updateUser(
    @Param('userId') userId: string,
    @Body('userName') userName: string,
    @Body('profileBody') profileBody: string,
    @Body('iconId') iconId: string,
  ): Promise<User> {
    return this.usersService.updateUser(userId, userName, profileBody, iconId);
  }

  // DELETE - /users/[userId]
  @Delete('/:userId')
  deleteUser(@Param('userId') userId: string): Promise<void | string> {
    return this.usersService.deleteUser(userId);
  }
}
