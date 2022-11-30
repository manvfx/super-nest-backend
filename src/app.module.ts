import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ShopModule } from './shop/shop.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { CommonModule } from './common/common.module';
import { SmsModule } from './sms/sms.module';
import { ManagerModule } from './manager/manager.module';
import { SellerModule } from './seller/seller.module';
import { TransactionModule } from './transaction/transaction.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/shopdatabase'),
    DashboardModule,
    UserModule,
    AuthModule,
    ShopModule,
    CategoryModule,
    ProductModule,
    SubscriptionModule,
    CommonModule,
    SmsModule,
    ManagerModule,
    SellerModule,
    TransactionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
