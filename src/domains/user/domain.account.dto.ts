import { IsEmail, IsString } from 'class-validator';

export class AccountDTO {
  @IsString()
  userName: string;

  @IsEmail()
  email: string;
}
