import { Controller, Post, Body, Delete, Param, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(
    @Body()
    createUserDto: {
      username: string;
      password: string;
      role: 'admin' | 'moderator';
    },
  ) {
    const { username, password, role } = createUserDto;
    return await this.usersService.create(username, password, role);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.delete(+id);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }
}
