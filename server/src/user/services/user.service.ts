import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { UpdateUserDto } from '../dto/update-user';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(data: Partial<User>): Promise<User> {
    const user = this.userRepository.create(data);
    await user.setPassword(user.password);
    await this.userRepository.save(user);
    // delete user.password;
    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findUserById(id);
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.findUserById(id);
    await this.userRepository.remove(user);
  }

  async comparePassword(user: User, password: string): Promise<boolean> {
    const userWithPassword = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.id = :id', { id: user.id })
      .getOne();

    if (!userWithPassword) {
      throw new NotFoundException('User not found');
    }

    return bcrypt.compare(password, userWithPassword.password);
  }
}
