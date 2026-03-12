import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './modules/products/products.module';
import { VariantsModule } from './modules/variants/variant.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/products'), ProductsModule, VariantsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
