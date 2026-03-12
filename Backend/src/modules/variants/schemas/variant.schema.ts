import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from '../../products/schemas/product.schema';

export type VariantDocument = Variant & Document;

@Schema({ timestamps: true })
export class Variant {
    @Prop({ type: String, required: true })
    value: string;

    @Prop({ type: Types.ObjectId, ref: Product.name, required: true })
    product: Product;

    @Prop({ type: [{ baureihe: String, modelle: [String] }], required: true })
    assignments: { baureihe: string; modelle: string[] }[];
}

export const VariantsSchema = SchemaFactory.createForClass(Variant);