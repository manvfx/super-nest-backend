import { IsNotEmpty } from 'class-validator';

export class ShopCreateDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  location: any;

  image: string;
}
