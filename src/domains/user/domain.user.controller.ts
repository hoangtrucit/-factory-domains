import { Controller, Get, Inject, Post } from '@nestjs/common';
import { USER_TOKEN_SERVICE, UserService } from './domain.user.service';
import {
  CreateUserRequest,
  UserServiceController,
  UserServiceControllerMethods,
} from '@factory/protobuf/gRPC/generate/index.app.payment.user.service.v1';

@Controller('user')
@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  constructor(@Inject(USER_TOKEN_SERVICE) private userService: UserService) {}

  @Get('/v1')
  async getUsers() {
    console.log(
      '🚀🚀🚀 file: user.controller.ts [line 15] call method getUsers',
    );
    return {
      users: await this.userService.get(),
    };
  }

  @Post('/v1')
  async createUser(request: CreateUserRequest) {
    const result = await this.userService.create(request);

    return { id: result.id };
  }
}
