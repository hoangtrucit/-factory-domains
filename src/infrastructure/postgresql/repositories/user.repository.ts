// Libs importing
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AbstractRepository, IRepository } from './abstract.repository';
import { UserEntity } from '../entities';

export const I_USER_REPOSITORY = 'I_USER_REPOSITORY';

export interface IUserRepository extends IRepository<UserEntity> {
  getUsers: () => Promise<UserEntity[]>;
}

@Injectable()
export class UserRepository
  extends AbstractRepository<UserEntity>
  implements IUserRepository
{
  constructor(
    @InjectRepository(UserEntity)
    repository: Repository<UserEntity>,
  ) {
    super(repository);
  }

  async getUsers(): Promise<UserEntity[]> {
    return await this.findAll({
      relations: {
        posts: true,
      },
    });
  }
}
