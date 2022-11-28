import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { SMS } from './schemas/sms.schema';
import { Model } from 'mongoose';

const apiKey = '6E413851352B724759736661576B76627979447269413D3D';

@Injectable()
export class SmsService {
  constructor(
    @InjectModel(SMS.name)
    private SMSModel: Model<SMS>,
  ) {}

  async sendOtpCode(mobile: string): Promise<SMS> {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const url = `https://api.kavenegar.com/v1/${apiKey}/verify/lookup.json?receptor=${mobile}&token=${randomCode}&template=marketVerify`;
    const result = await axios.get(url);
    if (result.status !== 200) {
      throw new HttpException(result.data, 404);
    }
    return await new this.SMSModel({
      mobile,
      verifyCode: randomCode.toString(),
    }).save();
  }
}
