import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Category } from '../../category/schemas/category.schema';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  price: number;

  @Prop()
  isActive: Boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Category.name })
  category: MongooseSchema.Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
