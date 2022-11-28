import { IsNotEmpty } from 'class-validator';

export class CreateSmsDto {
  @IsNotEmpty()
  mobile: string;

  @IsNotEmpty()
  verifyCode: string;
}
