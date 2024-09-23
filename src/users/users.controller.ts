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
  Put,
  Header,
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

  @Header('Content-Type', 'application/json')
  @Post('login')
  async login(
    @Body() loginDto: { email: string; password: string },
    @Session() session: any,
    @Res() res: Response,
  ) {
    try {
      const user = await this.usersService.login(loginDto);
      console.log('User', user);
      if (!user) {
        throw new HttpException('Invalid username or password', 401);
      }
      session.user = user;
      res.send(user);
    } catch (e) {
      res.status(401).send('Invalid username or password');
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.delete(+id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() user: User,
    @Res() res: Response,
  ) {
    try {
      const foundUser = await this.usersService.findById(+id);
      if (!foundUser) {
        return res.status(404).send('User not found');
      }
      const result = await this.usersService.userRepository.save({
        ...user,
        id: +id,
      });
      // await this.usersService.updateSubscriptionPurchasedCounts();
      if (result === null) {
        return res.status(404).send('User not found');
      }
      res.send('User updated');
    } catch (e) {
      res.status(400).send('Invalid data');
    }
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.usersService.findById(+id);
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
