import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Seller } from '../../seller/schemas/seller.schema';
import { TypeSubscription } from '../enum/type.enum';

@Schema({ timestamps: true })
export class Subscription {
  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  terminationDate: string;

  @Prop({ type: String, enum: TypeSubscription, default: TypeSubscription.Free })
  type: TypeSubscription;

  @Prop({ default: false })
  expired: Boolean;

  @Prop()
  price: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Seller.name })
  seller: MongooseSchema.Types.ObjectId;  
}

export type SubscriptionDocument = Subscription & Document;
export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
