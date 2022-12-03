import { IsNotEmpty } from 'class-validator';

export class SubscriptionCreateDto {
  @IsNotEmpty()
  startDate: any;

  @IsNotEmpty()
  endDate: any;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  seller: any;
}
