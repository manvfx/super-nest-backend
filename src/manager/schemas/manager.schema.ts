import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ManagerDocument = Manager & Document;

@Schema({ timestamps: true })
export class Manager {
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

  @Prop()
  isActive: Boolean;

  @Prop()
  verifyAt?: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  deletedAt?: Date;
}

export const ManagerSchema = SchemaFactory.createForClass(Manager);
