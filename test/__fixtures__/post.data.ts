import { faker } from '@faker-js/faker/locale/af_ZA';
import { PostEntity } from 'src/infrastructure/postgresql/entities';
import { MOCK_ACCOUNT_DATA } from './account.data';

export const MOCK_POST_DATA: PostEntity[] = [
  new PostEntity({
    title: faker.string.alpha({ length: 80 }),
    createdBy: MOCK_ACCOUNT_DATA.id,
  }),
];
