import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { CommonModule } from 'src/common/common.module';
import { UserModule } from 'src/user/user.module';
import { CategoryModule } from 'src/category/category.module';
import { ProductModule } from 'src/product/product.module';
import { ShopModule } from 'src/shop/shop.module';
import { SellerModule } from 'src/seller/seller.module';
import { ManagerModule } from 'src/manager/manager.module';

@Module({
  imports: [
    CommonModule,
    UserModule,
    CategoryModule,
    ProductModule,
    ShopModule,
    SellerModule,
    ManagerModule
  ],
  controllers: [DashboardController],
})
export class DashboardModule {}
