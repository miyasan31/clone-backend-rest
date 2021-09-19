import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

const mockRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
});

describe('UsersService', () => {
  let usersService: UsersService;
  let userRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useFactory: mockRepository },
      ],
    }).compile();

    usersService = await module.get<UsersService>(UsersService);
    userRepository = await module.get(getRepositoryToken(User));
  });

  describe('getUsers', () => {
    it('get all users', async () => {
      userRepository.find.mockResolvedValue('mockUser');
      expect(userRepository.find).not.toHaveBeenCalled();

      const result = await usersService.getAllUser();
      expect(userRepository.find).toHaveBeenCalled();
      expect(result).toEqual('mockUser');
    });
  });

  describe('getUserById', () => {
    it('find success', async () => {
      const mockUser = {
        userName: 'みやさん',
        profileBody: '自己紹介文',
        iconId: '000000',
      };
      userRepository.findOne.mockResolvedValue(mockUser);
      expect(userRepository.findOne).not.toHaveBeenCalled();

      const mockId = 'miyasan_0301';
      const result = await usersService.getOneUser(mockId);
      expect(userRepository.findOne).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });

    it('user is not found', async () => {
      const mockId = 'miyasan_0301';
      userRepository.findOne.mockResolvedValue(null);
      expect(usersService.getOneUser(mockId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createUser', () => {
    it('insert user', async () => {
      const mockUser = {
        userId: 'mockTitle',
        userName: 'mockTitle',
        profileBody: 'mockDesc',
        iconId: 'aaa',
      };
      userRepository.save.mockResolvedValue(mockUser);
      expect(userRepository.save).not.toHaveBeenCalled();

      const result = await usersService.createUser(mockUser);
      expect(userRepository.save).toHaveBeenCalled();
      expect(result).toEqual({
        userName: mockUser.userName,
        profileBody: mockUser.profileBody,
        iconId: mockUser.iconId,
      });
    });
  });

  describe('deleteUser', () => {
    it('delete user', async () => {
      userRepository.delete.mockResolvedValue({ affected: 1 });
      expect(userRepository.delete).not.toHaveBeenCalled();
      const mockId = 'miyasan_0301';
      await usersService.deleteUser(mockId);
      expect(userRepository.delete).toHaveBeenCalledWith(mockId);
    });

    it('delete error', async () => {
      userRepository.delete.mockResolvedValue({ affected: 0 });

      const mockId = 'miyasan_0301';
      expect(usersService.deleteUser(mockId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateUser', () => {
    it('update status', async () => {
      const mockData = {
        userName: '',
        profileBody: '',
        iconId: '',
      };
      usersService.getOneUser = jest.fn().mockResolvedValue({
        userName: 'みやさん',
        profileBody: '自己紹介文',
        iconId: '00000',
      });
      expect(usersService.getOneUser).not.toHaveBeenCalled();

      const mockId = 'miyasan_0301';
      const result = await usersService.updateUser(
        mockId,
        mockData.userName,
        mockData.profileBody,
        mockData.iconId,
      );
      expect(usersService.getOneUser).toHaveBeenCalled();
      expect(userRepository.save).toHaveBeenCalled();
      expect(result.userName).toEqual(mockData.userName);
      expect(result.profileBody).toEqual(mockData.profileBody);
      expect(result.iconId).toEqual(mockData.iconId);
    });
  });
});
