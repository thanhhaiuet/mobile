import { Body, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateProductDto } from './data-access/dtos/product-request.dto';
import { ProductService } from './data-access/product.service';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  async createProduct(@Body() body: CreateProductDto) {
    await this.productService.createProduct(body);
  }
}
