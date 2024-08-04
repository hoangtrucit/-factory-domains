import { Controller, Get, Inject, Post } from '@nestjs/common';
import { USER_TOKEN_SERVICE, UserService } from './domain.account.service';

@Controller('account')
export class AccountController {
  constructor(@Inject(USER_TOKEN_SERVICE) private userService: UserService) {}

  @Get('/v1')
  async getUsers() {
    return {
      users: await this.userService.get(),
    };
  }

  @Post('/v1')
  async createUser(request: any) {
    const result = await this.userService.create(request);

    return { id: result.id };
  }
}
