// Libs importing
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AbstractRepository, IRepository } from './abstract.repository';
import { PostEntity } from '../entities';

export const I_POST_REPOSITORY = 'I_POST_REPOSITORY';

export interface IPostRepository extends IRepository<PostEntity> {}

@Injectable()
export class PostRepository
  extends AbstractRepository<PostEntity>
  implements IPostRepository
{
  constructor(
    @InjectRepository(PostEntity)
    repository: Repository<PostEntity>,
  ) {
    super(repository);
  }
}
