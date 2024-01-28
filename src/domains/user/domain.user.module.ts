import { Module } from '@nestjs/common';
import { USER_TOKEN_SERVICE, UserService } from './domain.user.service';
import { UserController } from './domain.user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    {
      provide: USER_TOKEN_SERVICE,
      useClass: UserService,
    },
  ],
  exports: [USER_TOKEN_SERVICE],
})
export class UserModule {}
