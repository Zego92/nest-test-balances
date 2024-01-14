// Core
import { Test, TestingModule } from '@nestjs/testing';

// Controllers
import { UserBalancesController } from './user-balances.controller';

// Services
import { UserBalancesService } from './user-balances.service';

describe('UserBalancesController', () => {
  let controller: UserBalancesController;
  let service: UserBalancesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserBalancesController],
      providers: [UserBalancesService],
    }).compile();

    controller = module.get(UserBalancesController);
    service = module.get(UserBalancesService);
  });

  describe('findOne', () => {
    it('return a user balance', async () => {
      const userId = 1;
      const expectedResult = {
        userId: 1,
        balance: 100,
      };

      jest
        .spyOn(service, 'findOne', UserBalancesService.call(this))
        .mockResolvedValue(expectedResult);

      const result = await controller.findOne(userId);

      expect(result).toEqual(expectedResult);
    });
  });
});
