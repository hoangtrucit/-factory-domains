import { faker } from '@faker-js/faker/locale/af_ZA';
import { SearchResponse } from 'src/domains/user/search.dto';
import { PostEntity } from 'src/infrastructure/postgresql/entities';

export const MOCK_RESPONSE_OBJECT: SearchResponse = {
  id: 'e98d05d2-c014-40bb-aef9-cc9ea6aa5663',
  title: 'title',
};

export const MOCK_POST_ENTITIES: PostEntity[] = [
  new PostEntity({
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    createdBy: faker.string.uuid(),
    accounts: [],
  }),
  new PostEntity({
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    createdBy: faker.string.uuid(),
    accounts: [],
  }),
];
