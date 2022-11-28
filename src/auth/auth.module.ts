import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { SmsModule } from 'src/sms/sms.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule, CommonModule, SmsModule],
  controllers: [AuthController],
})
export class AuthModule {}
