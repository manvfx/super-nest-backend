import { IsEmail, IsNotEmpty } from 'class-validator';

export class ManagerCreateDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
