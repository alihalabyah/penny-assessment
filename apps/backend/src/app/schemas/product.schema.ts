import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ type : String, required: true })
  name: string;

  @Prop({ type : String })
  description: string;

  @Prop({ type : Number, required: true })
  price: number;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
