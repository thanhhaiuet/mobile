import { EntityRepository } from 'typeorm';

import { EProfileSort, ESortBy, EStatusProduct } from '@constants/api.constants';
import { ETableName } from '@constants/entity.constants';

import { BaseRepository } from '@core/base-repository';

import { ProductEntity } from '@entities/product.entity';

import { ListProduct, ListProductProfileCreated } from './dtos/product-request.dto';

@EntityRepository(ProductEntity)
export class ProductRepository extends BaseRepository<ProductEntity> {
  protected alias: ETableName = ETableName.PRODUCT;

  getProducts(query: ListProduct) {
    const categoryArray = query?.categoryId?.split(',');

    console.log(categoryArray, 'asdas');

    const qb = this.createQb();
    const selects = [
      `${this.alias}.name`,
      `${this.alias}.image`,
      `${this.alias}.id`,
      `${this.alias}.priceStart`,
      `${this.alias}.priceEnd`,
      `${this.alias}.timeComplete`,
      `${this.alias}.priceStart`,
      `${this.alias}.createdAt`,
      `${ETableName.CATEGORIES}.name`,
      `${ETableName.CATEGORIES}.id`,
      `${this.alias}.userId`,
      `${this.alias}.userId`,
    ];
    qb.leftJoin(`${this.alias}.category`, ETableName.CATEGORIES).where(`${this.alias}.status = 1`);

    if (query.name) {
      qb.andWhere(`${this.alias}.name like :name`, { name: `%${query.name}%` });
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
      qb.andWhere(`${this.alias}.categoryId IN(:...categoryId)`, { categoryId: categoryArray });
    }

    qb.select(selects);

    this.queryBuilderAddPagination(qb, { page: query.page, limit: 8, sortBy: null });

    return qb.getManyAndCount();
  }

  getListProductCreated(userId: string, query: ListProductProfileCreated) {
    const qb = this.createQb();
    const selects = [
      `${this.alias}.name`,
      `${this.alias}.image`,
      `${this.alias}.id`,
      `${this.alias}.priceStart`,
      `${this.alias}.priceEnd`,
      `${this.alias}.timeComplete`,
      `${this.alias}.priceStart`,
      `${this.alias}.createdAt`,
      `${this.alias}.status`,
      `${ETableName.CATEGORIES}.name`,
      `${ETableName.CATEGORIES}.id`,
      `${this.alias}.userId`,
    ];
    qb.leftJoin(`${this.alias}.category`, ETableName.CATEGORIES).where(`${this.alias}.userId = :userId`, {
      userId,
    });

    if (query.sortBy) {
      console.log(56465454654564654565555555);
      switch (Number(query.sortBy)) {
        case EProfileSort.INPROGRESS: {
          console.log(56465454654564654565555555);

          qb.andWhere(`${this.alias}.status = ${EStatusProduct.INPROGRESS}`);
          break;
        }

        case EProfileSort.OPEN: {
          qb.andWhere(`${this.alias}.status = ${EStatusProduct.OPEN}`);
          break;
        }

        case EProfileSort.RESOLVE: {
          qb.andWhere(`${this.alias}.status = ${EStatusProduct.RESOLVE}`);
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

  getDetailProducts(productId: string) {
    const qb = this.createQb();
    const selects = [
      `${this.alias}.name`,
      `${this.alias}.image`,
      `${this.alias}.id`,
      `${this.alias}.description`,
      `${this.alias}.priceStart`,
      `${this.alias}.priceEnd`,
      `${this.alias}.timeComplete`,
      `${this.alias}.priceStart`,
      `${this.alias}.createdAt`,
      `${ETableName.USERS}.username`,
      `${ETableName.USERS}.id`,
      `${ETableName.USERS}.email`,
      `${ETableName.USERS}.phone`,
    ];
    qb.where(`${this.alias}.id = :id`, { id: productId });
    qb.leftJoin(`${this.alias}.category`, ETableName.CATEGORIES).leftJoin(`${this.alias}.user`, ETableName.USERS);

    qb.select(selects);

    return qb.getOne();
  }

  statisticalProductCreated(userId: string) {
    const qb = this.createQb();

    qb.leftJoin(`${this.alias}.estimates`, ETableName.ESTIMATE)
      .where(`${this.alias}.status = ${EStatusProduct.RESOLVE}`)
      .andWhere(`${this.alias}.userId = :id`, { id: userId })
      .andWhere(`${ETableName.ESTIMATE}.isChoose = 1`)
      .select(`SUM(${ETableName.ESTIMATE}.price) as totalPrice`);

    return qb.getRawOne();
  }
}
