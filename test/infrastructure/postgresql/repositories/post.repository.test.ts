// Lib imports
import { faker } from '@faker-js/faker';
import { UpdatePostDTO } from 'src/domains/user/domain.post.dto';
import {
  POST_TOKEN_SERVICE,
  PostService,
} from 'src/domains/user/domain.post.service';
import { PostRepository } from 'src/infrastructure/postgresql/repositories';
import { RepositoriesModule } from 'src/infrastructure/postgresql/repositories.module';
import {
  AccountRepository,
  I_ACCOUNT_REPOSITORY,
} from 'src/infrastructure/postgresql/repositories/account.repository';
import { I_POST_REPOSITORY } from 'src/infrastructure/postgresql/repositories/post.repository';
import { MOCK_ACCOUNT_DATA } from 'test/__fixtures__/account.data';
import { MOCK_POST_DATA } from 'test/__fixtures__/post.data';
import { setupE2E } from 'test/utils';

describe('Account Repository', () => {
  let postRepository: PostRepository = null;
  let accountRepository: AccountRepository = null;
  let postService: PostService = null;

  beforeAll(async () => {
    // setup app
    const { moduleRef } = await setupE2E(
      [
        RepositoriesModule.forRoot({
          database: globalThis.dbContainer.getDatabase(),
          host: globalThis.dbContainer.getHost(),
          port: globalThis.dbContainer.getFirstMappedPort(),
          username: globalThis.dbContainer.getUsername(),
          password: globalThis.dbContainer.getPassword(),
        }),
      ],
      [],
      [
        {
          provide: POST_TOKEN_SERVICE,
          useClass: PostService,
        },
      ],
    );

    postRepository = moduleRef.get<PostRepository>(I_POST_REPOSITORY);
    accountRepository = moduleRef.get<AccountRepository>(I_ACCOUNT_REPOSITORY);
    postService = moduleRef.get<PostService>(POST_TOKEN_SERVICE);

    // insert new account
    await accountRepository.getRepository().insert(MOCK_ACCOUNT_DATA);
    // insert new post
    await postRepository.getRepository().insert(MOCK_POST_DATA);
  });

  it('should update post success', async () => {
    const payload: UpdatePostDTO = {
      title: 'update title',
    };
    const updateResult = await postService.update(
      MOCK_POST_DATA[0].id,
      payload,
    );

    expect(updateResult).not.toBe(null);
    expect(updateResult.length).toBeGreaterThan(0);
    expect(updateResult[0].id).toEqual(MOCK_POST_DATA[0].id);
    expect(updateResult[0].title).toEqual(payload.title);

    const resultAfterUpdate = await postRepository.findById(
      MOCK_POST_DATA[0].id,
    );

    expect(resultAfterUpdate).toMatchObject({
      ...MOCK_POST_DATA[0],
      ...payload,
    });
  });

  it('should update post fail with post not existing', async () => {
    const payload: UpdatePostDTO = {
      title: 'update title',
    };

    try {
      await postService.update(faker.string.uuid(), payload);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual("post doens't exists");
    }
  });

  afterAll(async () => {
    jest.clearAllMocks();
  });
});
