import { ListProduct } from '@modules/product/data-access/dtos/product-request.dto';
import { Injectable } from '@nestjs/common';
import { BasePaginationResponseDto } from '@shared/dtos/base-request.dto';

import { httpBadRequest, httpNotFound } from '@shared/exceptions/http-exception';

import { CreateEstimate, DetailProduct } from './dtos/estimate-request.dto';
import { EstimateRepository } from './estimate.repository';

@Injectable()
export class EstimateService {
  constructor(private readonly estimateRepo: EstimateRepository) { }

  async createEstimate(body: CreateEstimate) {
    const newRecord = this.estimateRepo.create({ ...body, isChoose: false });

    return this.estimateRepo.save(newRecord);
  }

  getDetailProduct(body: DetailProduct, userId: string) {
    return this.estimateRepo.getDetailProduct(body, userId);
  }

  async deleteRecord(id: string) {
    const record = await this.estimateRepo.findOne({ id });

    if (!record) httpNotFound('Record not exist!');

    if (record.isChoose) httpBadRequest('You can delete this record!');

    record.deletedAt = new Date();

    return this.estimateRepo.save(record);
  }
  
  async getListProductEstimated(userId: string, query: ListProduct) {
    const data = await this.estimateRepo.getListProductEstimated(userId, query);
    return BasePaginationResponseDto.convertToPaginationResponse([data[0], data[1]], query.page);
  }
}
