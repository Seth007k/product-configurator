import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Variant, VariantDocument } from './schemas/variant.schema';
import { Product, ProductDocument } from '../products/schemas/product.schema';
import { CreateVariantDto } from "./dto/create-variant.dto";

@Injectable()
export class VariantsService {
    constructor(
        @InjectModel(Variant.name) private variantModel: Model<VariantDocument>,
        @InjectModel(Product.name) private productModel: Model<ProductDocument>
    ) { }

    async create(dto: CreateVariantDto): Promise<Variant> {
        const product = await this.productModel.findById(dto.productId);
        if (!product) throw new NotFoundException('Product not found');

        const variants = await this.variantModel.find({ product: product._id }).sort({ value: 1 });

        let nextValue = '01';
        if (variants.length > 0) {
            const lastValueNum = parseInt(variants[variants.length - 1].value, 10);
            nextValue = String(lastValueNum + 1).padStart(2, '0');
        }

        const variant = new this.variantModel({
            product: product._id,
            value: nextValue,
            assignments: dto.assignments,
        });

        return variant.save();
    }

    async findAllByProduct(productId: string): Promise<Variant[]> {
        return this.variantModel
            .find({ product: new Types.ObjectId(productId) })
            .populate('product')
            .exec();
    }
}