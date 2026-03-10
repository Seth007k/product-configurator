import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {

    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) { }

    private generateCode(name: string): string {
        const words = name.trim().split(' ');

        if (words.length === 1) return words[0].substring(0, 2).toUpperCase();

        return words.map(w => w[0].toUpperCase()).join('');
    }

    async create(createProductDto: CreateProductDto): Promise<Product> {


        const code = this.generateCode(createProductDto.name);

        const existing = await this.productModel.findOne({ code });

        if (existing) {
            throw new ConflictException('Product mit diesem Code existiert bereits');
        }

        const product = new this.productModel({ ...createProductDto, code });

        return product.save();
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }
}
