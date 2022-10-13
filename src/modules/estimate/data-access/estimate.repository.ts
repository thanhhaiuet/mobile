import { EntityRepository } from 'typeorm';

import { ETableName } from '@constants/entity.constants';

import { BaseRepository } from '@core/base-repository';

import { EstimateEntity } from '@entities/estimate.entity';

import { DetailProduct } from './dtos/estimate-request.dto';
import { ListProduct } from '@modules/product/data-access/dtos/product-request.dto';
import { ESortBy } from '@constants/api.constants';

@EntityRepository(EstimateEntity)
export class EstimateRepository extends BaseRepository<EstimateEntity> {
  protected alias: ETableName = ETableName.ESTIMATE;

  getDetailProduct(body: DetailProduct, userId: string) {
    const qb = this.createQb();

    const selects = [
      `${this.alias}.isChoose`,
      `${this.alias}.id`,
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

  getListProductEstimated(userId: string, query: ListProduct) {
    const qb = this.createQb();
    const selects = [
      `${this.alias}.id`,
      `${this.alias}.userId`,
      `${this.alias}.productId`,
      `${this.alias}.price`,
      `${this.alias}.timeComplete`,
      `${this.alias}.isChoose`,
      `${ETableName.PRODUCT}.name`,
      `${ETableName.PRODUCT}.image`,
      `${ETableName.PRODUCT}.priceStart`,
      `${ETableName.PRODUCT}.priceEnd`,
      `${ETableName.PRODUCT}.createdAt`,
      `${ETableName.CATEGORIES}.name`,
      `${ETableName.CATEGORIES}.id`,
    ];
    qb.leftJoin(`${this.alias}.product`, ETableName.PRODUCT)
      .leftJoin(`${ETableName.PRODUCT}.category`, ETableName.CATEGORIES)
      .where(`${this.alias}.userId = :userId`, { userId: userId });;

    if (query.sortBy) {
      switch (Number(query.sortBy)) {
        case ESortBy.HIGHT_TO_LOW: {
          qb.orderBy(`${this.alias}.priceStart`, 'DESC');
          break;
        }

        case ESortBy.LOW_TO_HIGHT: {
          qb.orderBy(`${this.alias}.priceStart`, 'ASC');
          break;
        }

        case ESortBy.NEW: {
          qb.orderBy(`${this.alias}.createdAt`, 'DESC');
          break;
        }

        default:
          break;
      }
    }

    qb.select(selects);

    this.queryBuilderAddPagination(qb, { page: query.page, limit: 8, sortBy: null });

    return qb.getManyAndCount();
  }

  getListEstimateOfProduct(productId: string, userId: string) {
    const qb = this.createQb();
    const selects = [
      `${this.alias}.id`,
      `${this.alias}.userId`,
      `${this.alias}.productId`,
      `${this.alias}.price`,
      `${this.alias}.timeComplete`,
      `${this.alias}.isChoose`,
      `${ETableName.USERS}.email`,
      `${ETableName.USERS}.username`,
      `${ETableName.USERS}.phone`
    ];
    qb.leftJoin(`${this.alias}.user`, ETableName.USERS)
      .where(`${this.alias}.userId = :userId`, { userId: userId })
      .andWhere(`${this.alias}.productId = :productId`, { productId: productId });

    qb.select(selects);

    return qb.getManyAndCount();
  }
}
