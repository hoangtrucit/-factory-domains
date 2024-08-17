import { Controller, Get, Inject, Query } from '@nestjs/common';
import { SEARCH_TOKEN_SERVICE, SearchService } from './domain.search.service';
import { SearchRequest, SearchResponse } from './search.dto';
import { Serialize } from 'src/infrastructure/interceptor/serialize.interceptor';

@Controller('search')
export class SearchController {
  constructor(
    @Inject(SEARCH_TOKEN_SERVICE)
    private readonly searchService: SearchService,
  ) {}

  @Serialize(SearchResponse)
  @Get('/v1')
  async searchPost(@Query() payload: SearchRequest): Promise<SearchResponse[]> {
    return await this.searchService.get(payload);
  }
}
