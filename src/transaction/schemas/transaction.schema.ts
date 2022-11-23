import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Seller } from '../../seller/schemas/seller.schema';
import { Subscription } from '../../subscription/schemas/subscription.schema';

export enum statusTransaction {
  failed = 'failed',
  success = 'success',
}

@Schema({ timestamps: true })
export class Transaction {
  @Prop()
  transactionNumber: string;

  @Prop()
  transactionStatusCode: Number;

  @Prop({ type: statusTransaction, default: 'failed' })
  status: string;

  @Prop()
  description: string;

  @Prop()
  amount: Number;

  @Prop()
  trackingNumber: Number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Seller.name })
  seller: MongooseSchema.Types.ObjectId;  

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Subscription.name })
  subscription: MongooseSchema.Types.ObjectId; 
}

export type TransactionDocument = Transaction & Document;
export const TransactionSchema = SchemaFactory.createForClass(Transaction);