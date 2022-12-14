import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Shop } from '../../shop/schemas/shop.schema';

@Schema({ timestamps: true })
export class Seller {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  mobile: string;

  @Prop()
  verifyCode: string;

  @Prop({ default: 'free' })
  vipType: string;

  @Prop({ default: true })
  isActive: Boolean;

  @Prop()
  verifyAt?: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  deletedAt?: Date;

  @Prop()
  vipAt?: Date;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: Shop.name })
  shops: MongooseSchema.Types.ObjectId[];
}

export type SellerDocument = Seller & Document;
export const SellerSchema = SchemaFactory.createForClass(Seller);
