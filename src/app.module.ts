import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ShopModule } from './shop/shop.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/shopdatabase'),
    UserModule,
    AuthModule,
    ShopModule,
    CategoryModule,
    ProductModule,
    SubscriptionModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
