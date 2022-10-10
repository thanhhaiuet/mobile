import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { EStatusProduct } from '@constants/api.constants';
import { ETableName } from '@constants/entity.constants';

import { BaseEntityIncludeTime } from '@core/base-entity';

import { IProductAttribute } from './attributes/product.interface';
import { CategoryEntity } from './category.entity';
import { EstimateEntity } from './estimate.entity';
import { UserEntity } from './user.entity';

@Entity({ name: ETableName.PRODUCT })
export class ProductEntity extends BaseEntityIncludeTime implements IProductAttribute {
	@Column({ type: 'text' })
	description: string;

	@Column({ type: 'varchar', length: '50' })
	userId: string;

	@Column({ type: 'varchar', length: '500' })
	name: string;

	@Column({ type: 'varchar', length: '50', name: 'category_id' })
	categoryId: string;

	@Column({ type: 'int', name: 'price_start' })
	priceStart: number;

	@Column({ type: 'int', name: 'price_end' })
	priceEnd: number;

	@Column({ type: 'tinyint' })
	status: EStatusProduct;

	@Column({ type: 'int', name: 'time_complete' })
	timeComplete: number;

	@ManyToOne(() => UserEntity, user => user.products)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity;

	@ManyToOne(() => CategoryEntity, category => category.products)
	@JoinColumn({ name: 'category_id' })
	category: CategoryEntity;

	@OneToMany(() => EstimateEntity, estimate => estimate.product)
	estimates: EstimateEntity[];
}
