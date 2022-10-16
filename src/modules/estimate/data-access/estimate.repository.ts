import { EntityRepository } from 'typeorm';

import { EProfileSort, ESortBy } from '@constants/api.constants';
import { ETableName } from '@constants/entity.constants';

import { BaseRepository } from '@core/base-repository';

import { EstimateEntity } from '@entities/estimate.entity';

import { ListProduct } from '@modules/product/data-access/dtos/product-request.dto';

import { DetailProduct, GetListProductEstimated } from './dtos/estimate-request.dto';

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

  getListProductEstimated(userId: string, query: GetListProductEstimated) {
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
      `${ETableName.PRODUCT}.status`,
      `${ETableName.PRODUCT}.timeComplete`,
      `${ETableName.PRODUCT}.priceEnd`,
      `${ETableName.PRODUCT}.createdAt`,
      `${ETableName.CATEGORIES}.name`,
      `${ETableName.CATEGORIES}.id`,
    ];
    qb.leftJoin(`${this.alias}.product`, ETableName.PRODUCT)
      .leftJoin(`${ETableName.PRODUCT}.category`, ETableName.CATEGORIES)
      .where(`${this.alias}.userId = :userId`, { userId });

    if (query.sortBy) {
      switch (Number(query.sortBy)) {
        case EProfileSort.INPROGRESS: {
          qb.andWhere(`${ETableName.PRODUCT}.status = ${EProfileSort.INPROGRESS}`).andWhere(
            `${this.alias}.isChoose = 1`,
          );
          break;
        }

        case EProfileSort.RESOLVE: {
          qb.andWhere(`${ETableName.PRODUCT}.status = ${EProfileSort.RESOLVE}`).andWhere(`${this.alias}.isChoose = 1`);
          break;
        }

        case 1: {
          qb.andWhere(`${this.alias}.isChoose = 0`);
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
      `${ETableName.USERS}.phone`,
      `${ETableName.USERS}.id`,
    ];
    qb.leftJoin(`${this.alias}.user`, ETableName.USERS)
      .andWhere(`${this.alias}.productId = :productId`, { productId })
      .andWhere(`${this.alias}.isChoose = 0`)

    qb.select(selects);

    return qb.getManyAndCount();
  }

  async statisticalReceive(userId: string) {
    const qb = this.createQb();

    const qb2 = this.createQb();

    qb.select('COUNT(*) as count').where(`${this.alias}.userId = :userId`, { userId });

    qb2
      .select('COUNT(*) as countResolve')
      .leftJoin(`${this.alias}.product`, ETableName.PRODUCT)
      .where(`${ETableName.PRODUCT}.status = 3`)
      .andWhere(`${this.alias}.userId = :userId`, { userId });

    const [data, data1] = await Promise.all([qb.getRawOne(), qb2.getRawOne()]);

    return {
      count: Number(data?.count),
      countResolve: Number(data1?.countResolve),
    };
  }
}
