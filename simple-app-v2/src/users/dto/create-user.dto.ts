import { IsString, IsEmail, IsIn } from 'class-validator';
export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsIn('soldier', 'commander')
  role: string;
}
