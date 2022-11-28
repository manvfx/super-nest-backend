import { IsNotEmpty } from 'class-validator';

export class LoginOtpDto {
  @IsNotEmpty()
  mobile: string;
}
