import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product, ProductSchema } from './schemas/product.schema';
import { Variant, VariantsSchema } from './schemas/variant.schema';
import { VariantsController } from './variant.controller';
import { VariantsService } from './variants.service';


@Module({
  imports: [MongooseModule.forFeature([
    { name: Product.name, schema: ProductSchema },
    { name: Variant.name, schema: VariantsSchema },
  ]),
  ],
  controllers: [ProductsController, VariantsController],
  providers: [ProductsService, VariantsService],
})
export class ProductsModule { }
