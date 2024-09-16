import {
  IsEmail,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { IUser } from '../types/users_types';

export class User implements IUser {
  id: number;

  @IsNotEmpty()
    firstName: string;

  @IsNotEmpty()
    lastName: string;

  @IsNotEmpty()
  @IsEmail()
    email: string;

  @IsNotEmpty()
  @IsEnum(['operator', 'admin', 'user'])
    role: 'operator' | 'admin' | 'user';
}
