import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../services/user.service';
import { User as UserEntity } from '../../shared/entities/user.entity';
import { UpdateUserDto } from '../dto/update-user';
import { User } from '../../shared/interfaces/user.interface';
import { generateMockUser } from '../../shared/mock/user.mock';
import { Request, Response } from 'express';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {},
        },
      ],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('update', () => {
    it('should update the user and return the updated user', async () => {
      const updateUserDto: Partial<UpdateUserDto> = { firstname: 'John' };
      const user: User = generateMockUser(1);
      const updatedUser: User = { ...user, ...updateUserDto };
      jest.spyOn(userService, 'updateUser').mockResolvedValue(updatedUser);

      const result = await controller.update(user, updateUserDto);

      expect(result).toEqual(updatedUser);
      expect(userService.updateUser).toHaveBeenCalledWith(
        user.id,
        updateUserDto
      );
    });
  });

  describe('deleteAccount', () => {
    it('should delete the user and send a success response', async () => {
      const user: User = generateMockUser(1);
      const req: Request = {
        logout: jest.fn((cb) => cb()),
      } as unknown as Request;
      const res: Response = {
        sendStatus: jest.fn((status) => status),
      } as unknown as Response;
      jest.spyOn(userService, 'deleteUser').mockResolvedValue(undefined);

      await controller.deleteAccount(user, req, res);

      expect(userService.deleteUser).toHaveBeenCalledWith(user.id);
      expect(req.logout).toHaveBeenCalled();
      expect(res.sendStatus).toHaveBeenCalledWith(200);
    });
  });
});
