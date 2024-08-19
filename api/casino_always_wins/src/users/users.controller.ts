import { Controller, Post, Put, Get, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() body: { username: string }) {
    return this.usersService.updateUserInfo(id, body.username);
  }
}
