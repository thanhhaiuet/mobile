import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { ETableName } from '@constants/entity.constants';

import { BaseEntityIncludeTime } from '@core/base-entity';

import { ICategoryAttribute } from './attributes/category-attribute.interface';
import { ProductEntity } from './product.entity';

@Entity({ name: ETableName.CATEGORIES })
export class CategoryEntity extends BaseEntityIncludeTime implements ICategoryAttribute {
	@Column({ name: 'parent_id', type: 'varchar', length: '255', default: null, nullable: true })
	parentId: string;

	@Column({ type: 'varchar', length: '255' })
	name: string;

	// references
	@OneToMany(() => CategoryEntity, subcategory => subcategory.category, { cascade: true, nullable: true })
	subcategories: CategoryEntity[];

	@ManyToOne(() => CategoryEntity, category => category.subcategories)
	@JoinColumn({ name: 'parent_id' })
	category: CategoryEntity;

	@ManyToOne(() => ProductEntity, product => product.category)
	@JoinColumn({ name: 'parent_id' })
	products: ProductEntity;
}
