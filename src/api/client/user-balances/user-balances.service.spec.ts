// Core
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnprocessableEntityException } from '@nestjs/common';

// DTO
import { CreateUserBalanceDto } from '@/api/client/user-balances/dto';

// Entities
import { UserBalanceEntity } from '@/database/entities';

// Services
import { UserBalancesService } from './user-balances.service';

describe('UserBalancesService', () => {
  let service: UserBalancesService;
  let userBalanceRepository: Repository<UserBalanceEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserBalancesService,
        {
          provide: getRepositoryToken(UserBalanceEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get(UserBalancesService);
    userBalanceRepository = module.get(getRepositoryToken(UserBalanceEntity));
  });

  describe('create', () => {
    it('should create a user balance', async () => {
      const createUserBalanceDto: CreateUserBalanceDto = {
        userId: 1,
        balance: 100,
      };

      jest
        .spyOn(userBalanceRepository, 'create')
        .mockReturnValue(createUserBalanceDto);
      jest.spyOn(userBalanceRepository, 'save').mockResolvedValue(undefined);

      const result = await service.create(createUserBalanceDto);

      expect(result).toEqual({ message: 'User Balance has been created.' });
    });

    it('should throw an UnprocessableEntityException on save failure', async () => {
      const createUserBalanceDto: CreateUserBalanceDto = {
        userId: 1,
        balance: 100,
      };

      jest
        .spyOn(userBalanceRepository, 'create')
        .mockReturnValue(createUserBalanceDto);
      jest
        .spyOn(userBalanceRepository, 'save')
        .mockRejectedValue(new Error('Save error'));

      await expect(service.create(createUserBalanceDto)).rejects.toThrowError(
        UnprocessableEntityException,
      );
    });
  });

  describe('findOne', () => {
    it('should find a user balance by userId', async () => {
      const userId = 1;
      const userBalanceEntity: UserBalanceEntity = {
        userId,
        balance: 100,
      };

      jest
        .spyOn(userBalanceRepository, 'findOneByOrFail')
        .mockResolvedValue(userBalanceEntity);

      const result = await service.findOne(userId);

      expect(result).toEqual(userBalanceEntity);
    });

    it('should throw a NotFoundException if user balance is not found', async () => {
      const userId = 1;

      jest
        .spyOn(userBalanceRepository, 'findOneByOrFail')
        .mockRejectedValue(new Error('Not found'));

      await expect(service.findOne(userId)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
