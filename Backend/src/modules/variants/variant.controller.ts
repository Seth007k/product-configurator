import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VariantsService } from './variants.service';
import { CreateVariantDto } from './dto/create-variant.dto';
import { Variant } from './schemas/variant.schema';

@Controller('variants')
export class VariantsController {
    constructor(private readonly variantsService: VariantsService) { }

    @Post()
    async create(@Body() dto: CreateVariantDto): Promise<Variant> {
        return this.variantsService.create(dto);
    }

    @Get('product/:productId')
    async findAll(@Param('productId') productId: string): Promise<Variant[]> {
        return this.variantsService.findAllByProduct(productId);
    }
}