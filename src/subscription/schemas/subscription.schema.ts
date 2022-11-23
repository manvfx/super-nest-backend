import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Seller } from '../../seller/schemas/seller.schema';

export enum typeSubscription {
  free = 'free',
  monthly = 'monthly',
  yearly = 'yearly',
}

@Schema({ timestamps: true })
export class Subscription {
  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  terminationDate: Date;

  @Prop({ type: typeSubscription, default: typeSubscription.free })
  type: string;

  @Prop({ default: false })
  expired: Boolean;

  @Prop()
  price: string;

  @Prop()
  createdAt: Date;

  @Prop()
  deletedAt?: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Seller.name })
  seller: MongooseSchema.Types.ObjectId;  
}

export type SubscriptionDocument = Subscription & Document;
export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
