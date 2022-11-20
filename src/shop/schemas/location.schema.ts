import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class Location extends Document {
  @Prop({ default: '' })
  x: string;

  @Prop({ default: '' })
  y: string;
}
