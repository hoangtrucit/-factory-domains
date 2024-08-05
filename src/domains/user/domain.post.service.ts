import { Inject, Injectable } from '@nestjs/common';
import {
  I_POST_REPOSITORY,
  IPostRepository,
} from 'src/infrastructure/postgresql/repositories/post.repository';
import { PostEntity } from 'src/infrastructure/postgresql/entities';
import { UpdatePostDTO } from './domain.post.dto';
import { AccountEntity } from 'src/infrastructure/postgresql/entities/account.entity';

export const POST_TOKEN_SERVICE = 'POST MODULE USER_TOKEN_SERVICE';

@Injectable()
export class PostService {
  constructor(
    @Inject(I_POST_REPOSITORY)
    private postRepository: IPostRepository,
  ) {
    //
  }

  async update(id: string, payload: UpdatePostDTO): Promise<PostEntity[]> {
    const queryRunner = this.postRepository.getDataSource().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // ACID RDBMS
      // get & lock post (parameters binding)
      const postEntity = await queryRunner.manager
        .createQueryBuilder(PostEntity, 'post')
        .setLock('pessimistic_write')
        .where('id = :id', { id })
        .getOne();

      if (!postEntity) {
        throw new Error("post doens't exists");
      }

      // no concat string
      const updateResult = await queryRunner.manager
        .createQueryBuilder(PostEntity, 'post')
        .update()
        .set(payload)
        .where('id = :id', { id })
        .returning('*')
        .execute();

      await queryRunner.commitTransaction();
      return updateResult.raw;
    } catch (err) {
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
      throw new Error(err.message);
    } finally {
      // you need to release query runner which is manually created:
      console.log(
        '🚀🚀🚀 file: domain.post.service.ts [line 39] release transaction',
      );
      await queryRunner.release();
    }
  }

  async get(): Promise<PostEntity[]> {
    const result = await this.postRepository
      .getRepository()
      .createQueryBuilder('post')
      .select(['post', 'account'])
      .leftJoin(AccountEntity, 'account', 'post.created_by = account.id')
      .getRawMany();

    console.log(
      '🚀🚀🚀 file: domain.post.service.ts [line 70]',
      JSON.stringify(result, null, 4),
    );
    return result;
  }
}
