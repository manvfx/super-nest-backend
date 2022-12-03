import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from 'src/common/common.module';
import {
  Transaction,
  TransactionSchema,
} from 'src/payment/schemas/transaction.schema';
import { Seller, SellerSchema } from 'src/seller/schemas/seller.schema';
import {
  Subscription,
  SubscriptionSchema,
} from 'src/subscription/schemas/subscription.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: Seller.name, schema: SellerSchema },
      { name: Subscription.name, schema: SubscriptionSchema },
    ]),
    CommonModule,
  ],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
