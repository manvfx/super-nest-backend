import { Controller, Body } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SMS } from './schemas/sms.schema';
import { CreateSmsDto } from './dto/sms-create.dto';

@Controller('sms')
export class SmsController {
  constructor(private smsService: SmsService) {}

  async sendOtpCode(@Body() body: CreateSmsDto): Promise<SMS> {
    return this.smsService.sendOtpCode(body.mobile);
  }
}
