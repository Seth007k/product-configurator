import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VariantsService } from './variants.service';
import { CreateVariantDto } from './dto/create-variant.dto';
import { Variant } from './schemas/variant.schema';

@Controller('variants')
export class VariantsController {
    constructor(private readonly variantsService: VariantsService) { }

    /**
     * REST-Endpunkt zum Erstellen einer neuen Variante.
     * Route: POST /variants
     * dto - Die Daten zur Variantenerstellung aus dem Request-Body
     * return - Die neu erstellte Variante
     */
    @Post()
    async create(@Body() dto: CreateVariantDto): Promise<Variant> {
        return this.variantsService.create(dto);
    }

    /**
     * REST-Endpunkt zum Abrufen aller Varianten eines Produkts.
     * Route: GET /variants/product/:productId
     * productId - Die ID des Produkts als URL-Parameter
     * return - Ein Array von Varianten
     */
    @Get('product/:productId')
    async findAll(@Param('productId') productId: string): Promise<Variant[]> {
        return this.variantsService.findAllByProduct(productId);
    }
}