import { IsEmail, IsString } from 'class-validator';

export class UserDTO {
  @IsString()
  userName: string;

  @IsEmail()
  email: string;
}
