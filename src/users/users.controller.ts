import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Get,
  Session,
} from '@nestjs/common';
import { UsersService } from './users.service';
import CreateChargeDto from '../payment/stripe/dto/create-charge.dto';
import { User } from './user.entity';
import { StripeService } from '../payment/stripe/stripe.service';

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

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }
}
