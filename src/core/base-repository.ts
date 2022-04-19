import { isObservable } from 'rxjs';
import {
  EntityManager,
  EntityTarget,
  Repository,
  SaveOptions,
  SelectQueryBuilder,
  Transaction,
  TransactionManager,
} from 'typeorm';

import { ETableName } from '@constants/entity.constants';

import { IPagination } from '@shared/interfaces/query.interface';

type ActionWithTransaction = (...arg: any) => Promise<any>;

export abstract class BaseRepository<E> extends Repository<E> {
  protected abstract alias: ETableName;

  protected createQb() {
    return this.createQueryBuilder(this.alias);
  }

  @Transaction()
  async createTransaction(
    @TransactionManager() manager: EntityManager,
    ...args: ActionWithTransaction[]
  ) {
    const promiseResult = [] as any[];
    if (args.length) {
      for (const iterator of args) {
        if (typeof iterator === 'function') {
          const result = iterator.call(this, manager);
          if (isObservable(result)) {
            promiseResult.push(await result.toPromise());
          } else {
            promiseResult.push(await result);
          }
        }
      }
    }
    return promiseResult;
  }

  @Transaction()
  async createTransactionStreamData(
    @TransactionManager() manager: EntityManager,
    ...args: ActionWithTransaction[]
  ) {
    let resultTemp = null;
    if (args.length) {
      for (const iterator of args) {
        if (typeof iterator === 'function') {
          resultTemp = await iterator.call(this, manager, resultTemp);
        }
      }
    }
    return resultTemp;
  }

  saveWithTransaction<T = E>(
    data: T,
    saveOptions: SaveOptions,
    manager: EntityManager,
  ) {
    return manager.save<T>(data, saveOptions);
  }

  removeWithTransaction<T = E>(data: T, manager: EntityManager) {
    return manager.remove<T>(data);
  }

  updateWithTransaction<T = E>(
    target: EntityTarget<T>,
    criteria: any,
    data: T,
    manager: EntityManager,
  ) {
    return manager.update<T>(target, criteria, data);
  }

  insertWithTransaction<T = E>(
    target: EntityTarget<T>,
    data: T,
    manager: EntityManager,
  ) {
    return manager.insert<T>(target, data);
  }
  deleteWithTransaction(target: any, criteria: any, manager: EntityManager) {
    return manager.delete<E>(target, criteria);
  }
  softDeleteWithTransaction(
    target: any,
    criteria: any,
    manager: EntityManager,
  ) {
    return manager.softDelete<E>(target, criteria);
  }

  protected queryBuilderAddPagination(
    queryBuilder: SelectQueryBuilder<E>,
    data: Partial<IPagination>,
    selections?: string[],
  ): SelectQueryBuilder<E> {
    if (typeof data !== 'object') {
      return queryBuilder;
    }
    if (data.limit) {
      queryBuilder.take(data.limit);
    }
    if (data.page) {
      queryBuilder.skip((data.page - 1) * data.limit);
    }
    if (data.sortBy) {
      if (
        !selections ||
        (selections && selections.includes(`${this.alias}.${data.sortBy}`))
      ) {
        queryBuilder.orderBy(
          `${this.alias}.${data.sortBy}`,
          data.direction || 'ASC',
        );
      }
    }
    return queryBuilder;
  }

  protected queryBuilderAddPaginationRaw(
    queryBuilder: SelectQueryBuilder<E>,
    data: Partial<IPagination>,
    selections?: string[],
  ): SelectQueryBuilder<E> {
    if (typeof data !== 'object') {
      return queryBuilder;
    }
    if (data.limit) {
      queryBuilder.limit(data.limit);
    }
    if (data.page) {
      queryBuilder.offset((data.page - 1) * data.limit);
    }
    if (data.sortBy) {
      if (
        !selections ||
        (selections && selections.includes(`${this.alias}.${data.sortBy}`))
      ) {
        queryBuilder.orderBy(
          `${this.alias}.${data.sortBy}`,
          data.direction || 'ASC',
        );
      }
    }
    return queryBuilder;
  }

  protected queryBuilderAddGroupBy(
    queryBuilder: SelectQueryBuilder<E>,
    fields: string[],
  ) {
    fields.forEach((field, index) => {
      if (index === 0) {
        queryBuilder.groupBy(field);
      } else {
        queryBuilder.addGroupBy(field);
      }
    });

    return queryBuilder;
  }
}
