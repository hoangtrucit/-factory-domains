import { faker } from '@faker-js/faker';
import {
  SearchArgs,
  SearchRequest,
  SortArgs,
} from 'src/domains/user/search.dto';

// plain object
export const MOCK_SEARCH_DATA_STATIC: SearchRequest = {
  search: {
    description: 'description',
    moduleNo: 'moduleno',
    remark: 'remark',
    decidedAt: {
      from: new Date(2023, 1, 1),
      to: new Date(2024, 1, 1),
    },
  },
  sort: {
    decidedAt: true,
    description: true,
    moduleNo: true,
    status: true,
  },
};

// plain object
export const MOCK_SEARCH_DATA: SearchRequest = {
  search: {
    description: faker.string.alpha({ length: 20 }),
    moduleNo: '',
    remark: faker.string.alpha({ length: 20 }),
    decidedAt: {
      from: faker.date.past(),
      to: faker.date.future(),
    },
  },
  sort: {
    decidedAt: true,
    description: true,
    moduleNo: true,
    status: true,
  },
};

// instance of class
const MOCK_SEARCH_ARGS = new SearchArgs();
MOCK_SEARCH_ARGS.decidedAt = {
  from: faker.date.past(),
  to: faker.date.future(),
};
MOCK_SEARCH_ARGS.description = faker.string.alpha({ length: 20 });
MOCK_SEARCH_ARGS.moduleNo = faker.string.alpha({ length: 20 });
MOCK_SEARCH_ARGS.remark = faker.string.alpha({ length: 20 });

// instance of class
const MOCK_SORT_ARGS = new SortArgs();
MOCK_SORT_ARGS.decidedAt = true;
MOCK_SORT_ARGS.description = true;
MOCK_SORT_ARGS.moduleNo = true;
MOCK_SORT_ARGS.status = true;

// instance of class
export const MOCK_SEARCH_INSTANCE = new SearchRequest(
  MOCK_SEARCH_ARGS,
  MOCK_SORT_ARGS,
);
