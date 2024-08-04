import { Module } from '@nestjs/common';
import { USER_TOKEN_SERVICE, UserService } from './domain.account.service';
import { AccountController } from './domain.account.controller';
import { POST_TOKEN_SERVICE, PostService } from './domain.post.service';
import { PostController } from './domain.post.controller';

@Module({
  imports: [],
  controllers: [AccountController, PostController],
  providers: [
    {
      provide: USER_TOKEN_SERVICE,
      useClass: UserService,
    },
    {
      provide: POST_TOKEN_SERVICE,
      useClass: PostService,
    },
  ],
  exports: [USER_TOKEN_SERVICE, POST_TOKEN_SERVICE],
})
export class UserModule {}
