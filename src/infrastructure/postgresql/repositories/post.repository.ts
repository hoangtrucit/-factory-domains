// Libs importing
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AbstractRepository, IRepository } from './abstract.repository';
import { PostEntity } from '../entities';
import { dataSourceRepository } from '../datasource';

export const I_POST_REPOSITORY = 'I_POST_REPOSITORY';

export interface IPostRepository extends IRepository<PostEntity> {
  searchPost(keyword: string): Promise<PostEntity[]>;
}

@Injectable()
export class PostRepository
  extends AbstractRepository<PostEntity>
  implements IPostRepository
{
  constructor(
    @InjectRepository(PostEntity)
    repository: Repository<PostEntity>,
  ) {
    super(repository, dataSourceRepository);
  }

  public async searchPost(keyword: string): Promise<PostEntity[]> {
    return await this.getRepository()
      .createQueryBuilder('post')
      .andWhere('post.title like :title', { title: `%${keyword}%` })
      .getMany();
  }
}
