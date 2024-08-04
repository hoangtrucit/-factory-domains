import { Inject, Injectable } from '@nestjs/common';
import { AccountDTO } from './domain.account.dto';
import {
  I_ACCOUNT_REPOSITORY,
  IAccountRepository,
} from 'src/infrastructure/postgresql/repositories/account.repository';
import { AccountEntity } from 'src/infrastructure/postgresql/entities/account.entity';

export const USER_TOKEN_SERVICE = 'USER MODULE USER_TOKEN_SERVICE';

@Injectable()
export class UserService {
  constructor(
    @Inject(I_ACCOUNT_REPOSITORY)
    private accountRepository: IAccountRepository,
  ) {
    //
  }

  async get() {
    return await this.accountRepository.getAccounts();
  }

  async create(accountDTO: AccountDTO): Promise<AccountEntity> {
    const newItem = this.accountRepository.create(accountDTO);

    return await newItem.save();
  }

  async transaction(): Promise<void> {
    //
  }
}
