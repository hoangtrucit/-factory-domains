// Libs importing
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AbstractRepository, IRepository } from './abstract.repository';
import { dataSourceRepository } from '../datasource';
import { AccountEntity } from '../entities/account.entity';

export const I_ACCOUNT_REPOSITORY = 'I_USER_REPOSITORY';

export interface IAccountRepository extends IRepository<AccountEntity> {
  getAccounts: () => Promise<AccountEntity[]>;
}

@Injectable()
export class AccountRepository
  extends AbstractRepository<AccountEntity>
  implements IAccountRepository
{
  constructor(
    @InjectRepository(AccountEntity)
    repository: Repository<AccountEntity>,
  ) {
    super(repository, dataSourceRepository);
  }

  async getAccounts(): Promise<AccountEntity[]> {
    return await this.findAll({
      relations: {
        posts: true,
      },
    });
  }
}
