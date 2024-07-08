import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    this.userRepository.find().then((users) => {
      if (users.length === 0) {
        this.create('admin', 'admin', 'admin').then((r) =>
          console.log('Admin user created', r),
        );
      }
    });
  }

  async create(
    username: string,
    password: string,
    role: 'admin' | 'moderator' = 'moderator',
  ): Promise<User> {
    const newUser = this.userRepository.create({ username, password, role });
    return await this.userRepository.save(newUser);
  }

  async delete(id: number): Promise<void> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.userRepository.remove(user);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findById(id: number): Promise<User | undefined> {
    return this.userRepository.findOneBy({ id });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      select: ['id', 'username', 'role'], // We don't need to return the password
    });
  }
}
