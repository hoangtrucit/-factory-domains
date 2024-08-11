import { SearchResponse } from 'src/domains/user/search.dto';

export const MOCK_RESPONSE_INSTANCE = new SearchResponse();
MOCK_RESPONSE_INSTANCE.description = 'my description';
MOCK_RESPONSE_INSTANCE.moduleNo = 'my moduleNo';
MOCK_RESPONSE_INSTANCE.remark = 'my remark';
MOCK_RESPONSE_INSTANCE.decidedAt = new Date(2023, 1, 1);
MOCK_RESPONSE_INSTANCE.ids = 'id1,id2,id3';

export const MOCK_RESPONSE_OBJECT: SearchResponse = {
  description: 'description',
  moduleNo: 'moduleNo',
  remark: 'remark',
  decidedAt: new Date(),
  ids: 'id1,id2,id3',
};
