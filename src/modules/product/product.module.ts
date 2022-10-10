import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductRepository } from './data-access/product.repository';
import { ProductService } from './data-access/product.service';
import { ProductController } from './product.controller';

@Module({
	imports: [TypeOrmModule.forFeature([ProductRepository])],
	controllers: [ProductController],
	providers: [ProductService],
})
export class ProductModule {}
