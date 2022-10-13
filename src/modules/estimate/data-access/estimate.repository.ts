import { EntityRepository } from 'typeorm';

import { ETableName } from '@constants/entity.constants';

import { BaseRepository } from '@core/base-repository';

import { EstimateEntity } from '@entities/estimate.entity';

import { DetailProduct } from './dtos/estimate-request.dto';

@EntityRepository(EstimateEntity)
export class EstimateRepository extends BaseRepository<EstimateEntity> {
  protected alias: ETableName = ETableName.ESTIMATE;

  getDetailProduct(body: DetailProduct, userId: string) {
    const qb = this.createQb();

    const selects = [
      `${this.alias}.isChoose`,
      `${ETableName.USERS}.id`,
      `${ETableName.USERS}.email`,
      `${ETableName.USERS}.phone`,
      `${ETableName.USERS}.username`,
    ];

    qb.leftJoin(`${this.alias}.user`, ETableName.USERS)
      .where(`${this.alias}.userId = :userId`, { userId })
      .andWhere(`${this.alias}.productId = :productId`, { productId: body?.productId });

    qb.select(selects);

    return qb.getOne();
  }
}
