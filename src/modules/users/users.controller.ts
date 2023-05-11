import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import UpdateUserDto from './dtos/update-user.dto';
import CreateUserDto from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/')
  async getUsers() {
    const users = await this.userService.getUsers();
    return users;
  }

  @Post('/')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.createUser(createUserDto);
    return newUser;
  }

  @Get('/:userId')
  async getUserById(@Param('userId') userId: string) {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Put('/:userId')
  async updateUserById(
    @Body() updateUserDto: UpdateUserDto,
    @Param('userId') userId: string,
  ) {
    const updatedUser = await this.userService.updateUserById(
      updateUserDto,
      userId,
    );
    return updatedUser;
  }

  @Delete('/:userId')
  async deleteUserById(@Param('userId') userId: string) {
    await this.userService.deleteUserById(userId);
    return { message: 'Delete user successfully' };
  }
}
