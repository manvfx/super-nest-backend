import { Module } from '@nestjs/common';
import { Shop, ShopSchema } from './schemas/shop.schema';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Shop.name, schema: ShopSchema }]),
    CommonModule,
  ],
  controllers: [ShopController],
  providers: [ShopService]
})
export class ShopModule {}
