import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Get,
  Session,
  Patch,
  HttpException,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import CreateChargeDto from '../payment/stripe/dto/create-charge.dto';
import { User } from './user.entity';
import { StripeService } from '../payment/stripe/stripe.service';
import { Response } from 'express';
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly stripeService: StripeService,
  ) {}

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

  @Patch(':id/password')
  async changePassword(
    @Param('id') id: string,
    @Body('newPassword') password: string,
    @Res() res: Response,
  ) {
    const result = await this.usersService.userRepository.update(+id, {
      password,
    });
    if (result.affected === 0) {
      return res.status(404).send('User not found');
    }
    res.send('Password updated');
  }
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }
}
