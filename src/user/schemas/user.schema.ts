import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User {
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

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
