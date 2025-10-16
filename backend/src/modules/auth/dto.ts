import { IsEmail, IsString, MinLength, IsOptional, IsIn } from 'class-validator';
import type { Role } from './roles';
export class RegisterDto {
  @IsEmail() email!: string;
  @IsString() @MinLength(6) password!: string;
  @IsOptional() @IsIn(['ADMIN','MANAGER','USER']) role?: Role;
}
export class LoginDto {
  @IsEmail() email!: string;
  @IsString() password!: string;
}
