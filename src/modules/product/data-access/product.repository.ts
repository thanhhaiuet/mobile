import { EntityRepository } from 'typeorm';

import { ETableName } from '@constants/entity.constants';

import { BaseRepository } from '@core/base-repository';

import { ProductEntity } from '@entities/product.entity';

@EntityRepository(ProductEntity)
export class ProductRepository extends BaseRepository<ProductEntity> {
	protected alias: ETableName = ETableName.PRODUCT;
}
