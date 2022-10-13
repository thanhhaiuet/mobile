import { Injectable } from '@nestjs/common';

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
}
