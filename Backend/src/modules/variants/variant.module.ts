import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Variant, VariantsSchema } from "./schemas/variant.schema";
import { VariantsController } from "./variant.controller";
import { VariantsService } from "./variants.service";
import { ProductsModule } from "../products/products.module";

@Module({
    imports: [
        ProductsModule,
        MongooseModule.forFeature([
            { name: Variant.name, schema: VariantsSchema }
        ]),
    ],
    controllers: [VariantsController],
    providers: [VariantsService],
})
export class VariantsModule { }