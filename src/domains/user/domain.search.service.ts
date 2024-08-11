// @ts-nocheck
import { Injectable } from '@nestjs/common';
import { SearchRequest, SearchResponse } from './search.dto';

export const SEARCH_TOKEN_SERVICE = 'SEARCH MODULE SEARCH_TOKEN_SERVICE';

@Injectable()
export class SearchService {
  constructor() {
    //
  }

  async get(payload: SearchRequest): Promise<SearchResponse> {
    // console.log(
    //   '🚀🚀🚀 file: domain.search.service.ts [line 13]',
    //   JSON.stringify(payload, null, 4),
    // );
    const instance = new SearchResponse();
    instance.description = 'description';
    instance.moduleNo = 'moduleNo';
    instance.remark = 'remark';
    instance.decidedAt = new Date();
    instance.ids = 'id1,id2,id3';
    instance.username = 'username';
    instance.password = 'password';

    return Promise.resolve(instance);

    // return Promise.resolve({
    //   description: 'description',
    //   moduleNo: 'moduleNo',
    //   remark: 'remark',
    //   decidedAt: new Date(),
    //   ids: 'id1,id2,id3',
    //   username: 'username',
    //   password: 'password',
    // });
  }
}
