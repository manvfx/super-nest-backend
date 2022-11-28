import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SmsController } from './sms.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SMS, SMSSchema } from './schemas/sms.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: SMS.name, schema: SMSSchema }])],
  providers: [SmsService],
  controllers: [SmsController],
  exports: [SmsService],
})
export class SmsModule {}
