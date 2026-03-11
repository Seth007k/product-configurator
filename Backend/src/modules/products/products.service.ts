import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { generateProductCode } from './utils/generate-product-code';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    ) { }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        let baseCode = generateProductCode(createProductDto.name)
        let code = baseCode
        let counter = 2

        while (await this.productModel.exists({ code })) {
            code = `${baseCode}${counter}`
            counter++
        }

        const product = new this.productModel({
            name: createProductDto.name,
            code,

        })

        return product.save()
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }
}
