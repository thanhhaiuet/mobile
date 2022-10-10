import { Injectable } from '@nestjs/common';

import { CreateProductDto } from './dtos/product-request.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
	constructor(private readonly productRepo: ProductRepository) {}

	createProduct(body: CreateProductDto) {
		const product = this.productRepo.create(body);

		return this.productRepo.save(product);
	}
}
