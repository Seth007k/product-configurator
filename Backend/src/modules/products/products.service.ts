import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { generateProductCode } from './utils/generate-product-code';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    ) { }

    /**
     * Erstellt ein neues Produkt in der Datenbank.
     * Generiert automatisch einen eindeutigen Produktcode basierend auf dem Namen.
     * 
     * createProductDto - Das DTO mit den Produktdaten
     * return -  Das gespeicherte Produkt-Dokument
     */
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

    /**
     * Ruft alle Produkte aus der Datenbank ab.
     * 
     * return - Ein Array aller Produkte
     */
    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }
}
