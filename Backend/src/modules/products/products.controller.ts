import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) { }

    /**
     * REST-Endpunkt zum Erstellen eines neuen Produkts.
     * Route: POST /products
     * createProductDto - Die JSON-Daten aus dem Request-Body
     * return - Das erstellte Produkt
     */
    @Post()
    async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productsService.create(createProductDto);
    }

    /**
     * REST-Endpunkt zum Abrufen aller Produkte.
     * Route: GET /products
     * return - Ein Array aller Produkte
     */
    @Get()
    async findAll(): Promise<Product[]> {
        return this.productsService.findAll();
    }
}
