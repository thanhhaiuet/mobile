import { Injectable } from '@nestjs/common';

import { EStatusProduct } from '@constants/api.constants';

import { BasePaginationResponseDto } from '@shared/dtos/base-request.dto';

import { CreateProductDto, ListProduct, ListProductProfileCreated } from './dtos/product-request.dto';
import { ProductRepository } from './product.repository';
import { httpNotFound } from '@shared/exceptions/http-exception';

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
    return this.productRepo.getDetailProducts(id);
  }

  async getListProductCreated(userId: string, query: ListProductProfileCreated) {
    const data = await this.productRepo.getListProductCreated(userId, query);
    return BasePaginationResponseDto.convertToPaginationResponse([data[0], data[1]], query.page);
  }

  async statisticalProductCreated(userId: string) {
    const countRecord = await this.productRepo.count({ where: { userId } });
    const totalMoney = await this.productRepo.statisticalProductCreated(userId);
    return {
      count: countRecord,
      totalMoney: totalMoney?.totalPrice,
    };
  }

  async updateStatus(status: EStatusProduct, productId: string) {
    const product = await this.productRepo.findOne({ id: productId });


    if (!product) httpNotFound('Record is not exist!');

    product.status = status;

    await this.productRepo.save(product);
  }
}
