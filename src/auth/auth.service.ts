import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    public readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async validateUser(loginDto: {
    username: string;
    password: string;
  }): Promise<any> {
    const { username, password } = loginDto;
    const user = await this.usersService.findByUsername(username);

    if (user && user.password === password) {
      return { username: user.username, id: user.id, role: user.role };
    }
    return null;
  }

  async login(user: any): Promise<string> {
    const payload: JwtPayload = {
      username: user.username,
      password: user.password,
    };
    return this.jwtService.sign(payload);
  }

  getCookieWithJwtToken(token: string) {
    return `Authentication=${token}; Path=/; Max-Age=${60 * 60 * 24 * 7}`; // Max-Age in seconds (e.g., 7 days)
  }

  sendPassword(user: User) {
    return this.emailService.sendEmail(
      user.username,
      'Password Recovery',
      'Password Recovery',
      `Your password is: ${user.password}`,
      [],
    );
  }

  getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
