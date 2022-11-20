import { Module } from '@nestjs/common';
import { Manager, ManagerSchema } from './schemas/manager.schema';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Manager.name, schema: ManagerSchema }]),
    CommonModule,
  ],
  controllers: [ManagerController],
  providers: [ManagerService],
  exports: [ManagerService],
})
export class ManagerModule {}
