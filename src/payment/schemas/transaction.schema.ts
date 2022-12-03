import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Seller } from '../../seller/schemas/seller.schema';
import { Subscription } from '../../subscription/schemas/subscription.schema';

@Schema({ timestamps: true })
export class Transaction {
  @Prop()
  transactionNumber: string;

  @Prop()
  transactionStatusCode: Number;

  @Prop({ type: Number, required: false })
  public status?: number;

  @Prop({ type: Number, required: false })
  public refId?: number;

  @Prop()
  description: string;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Seller.name })
  seller: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Subscription.name })
  subscription: MongooseSchema.Types.ObjectId;
}

export type TransactionDocument = Transaction & Document;
export const TransactionSchema = SchemaFactory.createForClass(Transaction);
