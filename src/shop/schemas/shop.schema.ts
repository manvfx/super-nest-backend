import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Location } from './location.schema';

@Schema({ timestamps: true })
export class Shop {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  address: string;

  @Prop({ type: Location })
  location: Location;

  @Prop({ default: true })
  isActive: Boolean;

  @Prop({ default: false })
  expired: Boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  deletedAt?: Date;
}

export type ShopDocument = Shop & Document;
export const ShopSchema = SchemaFactory.createForClass(Shop);
