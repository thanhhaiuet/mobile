import { EntityRepository } from 'typeorm';

import { ESortBy } from '@constants/api.constants';
import { ETableName } from '@constants/entity.constants';

import { BaseRepository } from '@core/base-repository';

import { ProductEntity } from '@entities/product.entity';

import { ListProduct } from './dtos/product-request.dto';

@EntityRepository(ProductEntity)
export class ProductRepository extends BaseRepository<ProductEntity> {
  protected alias: ETableName = ETableName.PRODUCT;

  getProducts(query: ListProduct) {
    const qb = this.createQb();
    const selects = [
      `${this.alias}.name`,
      `${this.alias}.image`,
      `${this.alias}.id`,
      `${this.alias}.priceStart`,
      `${this.alias}.priceEnd`,
      `${this.alias}.timeComplete`,
      `${this.alias}.priceStart`,
      `${ETableName.CATEGORIES}.name`,
      `${ETableName.CATEGORIES}.id`,
      `${this.alias}.userId`,
      `${this.alias}.userId`,
    ];
    qb.leftJoin(`${this.alias}.category`, ETableName.CATEGORIES);

    if (query.name) {
      qb.where(`${this.alias}.name like :name`, { name: `%${query.name}%` });
    }

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

    if (query.categoryId) {
      qb.andWhere(`${this.alias}.categoryId = :categoryId`, { categoryId: query.categoryId });
    }

    qb.select(selects);

    this.queryBuilderAddPagination(qb, { page: query.page, limit: 8 });

    return qb.getManyAndCount();
  }
}
