import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUser {
  @IsNotEmpty()
  @IsEmail()
    email: string;

  @IsNotEmpty()
    password: string;
}
