import { Controller, Get, Inject, Query } from '@nestjs/common';
import { SEARCH_TOKEN_SERVICE, SearchService } from './domain.search.service';
import { SearchRequest, SearchResponse } from './search.dto';

@Controller('search')
export class SearchController {
  constructor(
    @Inject(SEARCH_TOKEN_SERVICE)
    private readonly searchService: SearchService,
  ) {}

  @Get('/v1')
  async getUsers(@Query() payload: SearchRequest): Promise<SearchResponse> {
    return await this.searchService.get(payload);
  }
}
