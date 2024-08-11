import { createMock } from '@golevelup/ts-jest';
import { ClassSerializerInterceptor, INestApplication } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { instanceToPlain } from 'class-transformer';
import { SearchController } from 'src/domains/user/domain.search.controller';
import {
  SEARCH_TOKEN_SERVICE,
  SearchService,
} from 'src/domains/user/domain.search.service';
import * as request from 'supertest';
import {
  MOCK_RESPONSE_INSTANCE,
  MOCK_RESPONSE_OBJECT,
} from 'test/__fixtures__/search.controller';
import { MOCK_SEARCH_DATA } from 'test/__fixtures__/search.dto.data';

describe('Search Controller ', () => {
  let app: INestApplication;
  let searchService: SearchService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [
        {
          provide: SEARCH_TOKEN_SERVICE,
          useValue: createMock<SearchService>(),
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector)),
    );
    searchService = moduleRef.get(SEARCH_TOKEN_SERVICE);
    await app.init();
  });

  afterAll(async () => {
    jest.clearAllMocks();
    await app.close();
  });

  it('should get search success with instance', async () => {
    jest.spyOn(searchService, 'get').mockResolvedValue(MOCK_RESPONSE_INSTANCE);
    const res = await request(app.getHttpServer())
      .get('/search/v1')
      .query(MOCK_SEARCH_DATA);
    // console.log(
    //   '🚀🚀🚀 file: domain.search.controller.test.ts [line 46]',
    //   JSON.stringify(res.body, null, 4),
    // );
    // console.log(
    //   '🚀🚀🚀 file: domain.search.controller.test.ts [line 56] ',
    //   plainToInstance(SearchResponse, res.body, {
    //     excludeExtraneousValues: true,
    //     exposeDefaultValues: true,
    //   }),
    // );

    // console.log(
    //   '🚀🚀🚀 file: domain.search.controller.test.ts [line 64] ',
    //   instanceToPlain(MOCK_RESPONSE_INSTANCE),
    // );
    // console.log(
    //   '🚀🚀🚀 file: domain.search.controller.test.ts [line 68] ',
    //   res.body,
    // );

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchSnapshot();
    expect(res.body).toStrictEqual(
      instanceToPlain(MOCK_RESPONSE_INSTANCE, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
      }),
    );
  });

  it.only('should get search failure with object', async () => {
    jest.spyOn(searchService, 'get').mockResolvedValue(MOCK_RESPONSE_OBJECT);
    const res = await request(app.getHttpServer()).get('/search/v1');

    expect(res.statusCode).toBe(200);
    expect(res.body).not.toStrictEqual(
      instanceToPlain(MOCK_RESPONSE_INSTANCE, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
      }),
    );
  });
});
