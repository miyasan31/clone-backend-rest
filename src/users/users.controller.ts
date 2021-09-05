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
import { UserPropertyDto } from './dto/user-property.dto';
// import { UserRequestPipe } from './pipe/user-status.pipe';
import { UsersService } from './users.service';
import { User } from './entity/user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // GET - /users
  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  // GET - /users/:userId
  @Get('/:userId')
  getUserById(@Param('userId') userId: string): Promise<User> {
    return this.usersService.getUserById(userId);
  }

  // POST - /users
  @Post()
  // UserPropertyDtoで定義した@IsNotEmpty()が有効になる
  @UsePipes(ValidationPipe)
  createUser(@Body() userPropertyDto: UserPropertyDto): Promise<User> {
    return this.usersService.createUser(userPropertyDto);
  }

  // DELETE - /users/[userId]
  @Delete('/:userId')
  deleteUser(@Param('userId') userId: string): Promise<void | string> {
    return this.usersService.deleteUser(userId);
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
}
