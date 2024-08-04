import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePostDTO {
  @IsString()
  @IsNotEmpty()
  title: string;
}
