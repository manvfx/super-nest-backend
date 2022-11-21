import { IsEmail, IsNotEmpty } from 'class-validator';

export class SellerCreateDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  mobile: string;

  @IsNotEmpty()
  shops: any;
}
