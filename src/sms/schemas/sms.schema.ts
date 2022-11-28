import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class SMS {
  @Prop()
  mobile: string;

  @Prop()
  verifyCode: string;
}

export type SMSDocument = SMS & Document;
export const SMSSchema = SchemaFactory.createForClass(SMS);
