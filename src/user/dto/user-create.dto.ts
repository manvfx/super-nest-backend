import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
  
//   @IsNotEmpty()
//   password: string;
  
//   @IsNotEmpty()
//   password_confirm: string;
}
