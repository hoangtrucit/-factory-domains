import { createMock } from '@golevelup/ts-jest';
import { ClassSerializerInterceptor, INestApplication } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { SearchController } from 'src/domains/user/domain.search.controller';
import {
  SEARCH_TOKEN_SERVICE,
  SearchService,
} from 'src/domains/user/domain.search.service';
import { SearchResponse } from 'src/domains/user/search.dto';
import {
  I_POST_REPOSITORY,
  PostRepository,
} from 'src/infrastructure/postgresql/repositories/post.repository';
import * as request from 'supertest';
import { MOCK_POST_ENTITIES } from 'test/__fixtures__/search.controller';
import { MOCK_SEARCH_DATA } from 'test/__fixtures__/search.dto.data';

describe('Search Controller ', () => {
  let app: INestApplication;
  let postRepository: PostRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [
        {
          provide: SEARCH_TOKEN_SERVICE,
          useClass: SearchService,
        },
        {
          provide: I_POST_REPOSITORY,
          useValue: createMock<PostRepository>(),
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector)),
    );
    postRepository = moduleRef.get(I_POST_REPOSITORY);
    await app.init();
  });

  afterAll(async () => {
    jest.clearAllMocks();
    await app.close();
  });

  it('should get search success with instance', async () => {
    jest
      .spyOn(postRepository, 'searchPost')
      .mockResolvedValue(MOCK_POST_ENTITIES);
    const res = await request(app.getHttpServer())
      .get('/search/v1')
      .query(MOCK_SEARCH_DATA);

    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual(
      instanceToPlain(
        plainToInstance(SearchResponse, MOCK_POST_ENTITIES, {
          excludeExtraneousValues: true,
          exposeDefaultValues: true,
        }),
      ),
    );
  });
});
