import 'reflect-metadata';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { SearchRequest, SearchResponse } from 'src/domains/user/search.dto';
import {
  MOCK_SEARCH_DATA,
  MOCK_SEARCH_DATA_STATIC,
  MOCK_SEARCH_INSTANCE,
} from 'test/__fixtures__/search.dto.data';
import { cloneDeep } from 'lodash';
import { MOCK_RESPONSE_OBJECT } from 'test/__fixtures__/search.controller';

describe('Search DTO', () => {
  describe('Request', () => {
    it('should validate success with object', async () => {
      // plain -> instance
      const instance = plainToInstance(SearchRequest, MOCK_SEARCH_DATA, {
        exposeDefaultValues: true,
      });
      const validations = await validate(instance);

      // console.log('🚀🚀🚀 file: search.dto.test.ts [line 18] ', instance);
      // console.log(
      //   '🚀🚀🚀 file: search.dto.test.ts [line 19] ',
      //   instanceToPlain(instance),
      // );
      expect(validations.length).toBe(0);
      expect(instance).toBeInstanceOf(SearchRequest);
      // instance -> plain
      expect(instanceToPlain(instance)).toStrictEqual(MOCK_SEARCH_DATA);
    });

    it('should validate success with partial object', async () => {
      const MOCK_SEARCH_DATA_PARTIAL = cloneDeep(MOCK_SEARCH_DATA);
      delete MOCK_SEARCH_DATA_PARTIAL.search.moduleNo;

      const instance = plainToInstance(
        SearchRequest,
        MOCK_SEARCH_DATA_PARTIAL,
        {
          exposeDefaultValues: true,
        },
      );
      const validations = await validate(instance);

      expect(validations.length).toBe(0);
      expect(instance).toBeInstanceOf(SearchRequest);
      expect(instanceToPlain(instance)).not.toStrictEqual(
        MOCK_SEARCH_DATA_PARTIAL,
      );
      expect(instance.search.moduleNo).toEqual('module');
    });

    it('should validate failure with object', async () => {
      const instance = plainToInstance(
        SearchRequest,
        {
          search: {
            ...MOCK_SEARCH_DATA_STATIC.search,
            moduleNo: 10,
            description: 1000,
          },
          sort: MOCK_SEARCH_DATA_STATIC.sort,
        },
        {
          exposeDefaultValues: true,
          excludeExtraneousValues: true,
        },
      );
      const validations = await validate(instance);

      expect(validations.length).toBeGreaterThan(0);
      // expect(validations[0].children[0].constraints).toStrictEqual({
      //   isString: 'moduleNo must be a string',
      // });
      expect(validations).toMatchSnapshot();
    });

    it('should validate success with object more additional properties', async () => {
      // instance
      const instance = plainToInstance(
        SearchRequest,
        {
          sort: MOCK_SEARCH_DATA.sort,
          search: {
            ...MOCK_SEARCH_DATA.search,
            username: 'username',
            password: 'password',
          },
        },
        {
          exposeDefaultValues: true,
          excludeExtraneousValues: true,
        },
      );
      const validations = await validate(instance);

      expect(validations.length).toBe(0);
      expect(instance).toBeInstanceOf(SearchRequest);
      expect(instanceToPlain(instance)).toStrictEqual(MOCK_SEARCH_DATA);
    });

    it('should validate success with instance', async () => {
      const instance = plainToInstance(SearchRequest, MOCK_SEARCH_INSTANCE, {
        exposeDefaultValues: true,
      });

      const validations = await validate(instance);

      expect(validations.length).toBe(0);
      expect(instance).toBeInstanceOf(SearchRequest);
      expect(instance).toMatchObject(MOCK_SEARCH_INSTANCE);
    });
  });

  describe('Response', () => {
    it('should transform success with object', async () => {
      // plain -> instance
      const instance = plainToInstance(SearchResponse, MOCK_RESPONSE_OBJECT, {
        exposeDefaultValues: true,
        excludeExtraneousValues: true,
      });

      // instance -> plain
      expect(instanceToPlain(instance)).toStrictEqual(
        instanceToPlain(
          plainToInstance(SearchResponse, MOCK_RESPONSE_OBJECT, {
            exposeDefaultValues: true,
            excludeExtraneousValues: true,
          }),
        ),
      );
    });
  });
});
