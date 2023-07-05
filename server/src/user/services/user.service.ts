import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as UserEntity } from '../../shared/entities/user.entity';
import { User } from '../../shared/interfaces/user.interface';
import { UpdateUserDto } from '../dto/update-user';
import bcrypt from 'bcrypt';
import { Group } from '../../shared/interfaces/group.interface';
import { hashPassword } from '../../shared/utils/password.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getUserGroups(id: number): Promise<Group[]> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['groups'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.groups;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(data: Partial<User>): Promise<User> {
    const { password, ...userData } = data;
    const hashedPassword = await hashPassword(password);

    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });
    await this.userRepository.save(user);
    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
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

    return await bcrypt.compare(password, userWithPassword.password);
  }
}
