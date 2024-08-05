import { faker } from '@faker-js/faker';
import { AccountEntity } from 'src/infrastructure/postgresql/entities/account.entity';

export const MOCK_ACCOUNT_DATA: AccountEntity = new AccountEntity({
  id: faker.string.uuid(),
  email: faker.internet.email(),
});
