// Core
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// Constants
import { RESPONSE_MESSAGES } from '@/constants';

// DTO
import { CreateUserDto } from '@/api/users/dto';

// Entities
import { UserEntity } from '@/database/entities';

const { isCreated } = RESPONSE_MESSAGES;

@Injectable()
export class UsersService {
  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>;
  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);

    return this.userRepository
      .save(user)
      .then((response) => {
        return {
          message: isCreated('user'),
          user: response,
        };
      })
      .catch(() => {
        throw new UnprocessableEntityException(
          'An error occurred while creating the user',
        );
      });
  }

  async findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async findById(id: number) {
    return this.userRepository.findOneBy({ id });
  }
}
