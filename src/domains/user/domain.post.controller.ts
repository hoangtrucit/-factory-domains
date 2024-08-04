import { Body, Controller, Get, Inject, Param, Put } from '@nestjs/common';
import { POST_TOKEN_SERVICE, PostService } from './domain.post.service';
import { UpdatePostDTO } from './domain.post.dto';

@Controller('post')
export class PostController {
  constructor(@Inject(POST_TOKEN_SERVICE) private postService: PostService) {}

  @Get('/v1')
  async get() {
    return await this.postService.get();
  }

  @Put('/v1/:id')
  async update(@Body() payload: UpdatePostDTO, @Param('id') id: string) {
    return await this.postService.update(id, payload);
  }
}
