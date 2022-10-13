import { Injectable } from '@nestjs/common';

import { EStatusProduct } from '@constants/api.constants';

import { BasePaginationResponseDto } from '@shared/dtos/base-request.dto';

import { CreateProductDto, ListProduct } from './dtos/product-request.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepo: ProductRepository) { }

  createProduct(body: CreateProductDto) {
    const product = this.productRepo.create({ ...body, status: EStatusProduct.OPEN });

    return this.productRepo.save(product);
  }

  async getProducts(query: ListProduct) {
    const data = await this.productRepo.getProducts(query);
    return BasePaginationResponseDto.convertToPaginationResponse([data[0], data[1]], query.page);
  }

  getDetailProduct(id: string) {
    return this.productRepo.findOne({ id });
  }

  async getListProductCreated(userId: string, query: ListProduct) {
    const data = await this.productRepo.getListProductCreated(userId, query);
    return BasePaginationResponseDto.convertToPaginationResponse([data[0], data[1]], query.page);
  }
}
