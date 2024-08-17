import { Inject, Injectable } from '@nestjs/common';
import { SearchRequest, SearchResponse } from './search.dto';
import {
  I_POST_REPOSITORY,
  IPostRepository,
} from 'src/infrastructure/postgresql/repositories/post.repository';

export const SEARCH_TOKEN_SERVICE = 'SEARCH MODULE SEARCH_TOKEN_SERVICE';

@Injectable()
export class SearchService {
  constructor(
    @Inject(I_POST_REPOSITORY)
    private readonly postRepository: IPostRepository,
  ) {
    //
  }

  // return with Entity
  async get(payload: SearchRequest): Promise<SearchResponse[]> {
    return await this.postRepository.searchPost(payload?.search?.title || '');
  }

  // return with class-transform without Inteceptor
  // async get(payload: SearchRequest): Promise<SearchResponse[]> {
  //   const result = await this.postRepository.searchPost(
  //     payload?.search?.title || '',
  //   );

  //   console.log('🚀🚀🚀 file: domain.search.service.ts [line 37] ', result);

  //   return plainToInstance(SearchResponse, result, {
  //     excludeExtraneousValues: true,
  //   });
  // }
}
