import { EntityRepository } from 'typeorm';

import { ETableName } from '@constants/entity.constants';

import { BaseRepository } from '@core/base-repository';

import { CategoryEntity } from '@entities/category.entity';

import { BasePaginationRequestDto } from '@shared/dtos/base-request.dto';
import { transformQuery } from '@shared/utils/transform-query';

import { CMSCategoryReqDto, ListCategoryRqDto } from './dtos/category-request.dto';

@EntityRepository(CategoryEntity)
export class CategoryRepository extends BaseRepository<CategoryEntity> {
	protected alias: ETableName = ETableName.CATEGORIES;

	getCategories(options: ListCategoryRqDto) {
		const selects = [`${this.alias}.id`, `${this.alias}.parentId`, `${this.alias}.name`];
		const qb = this.createQb();
		qb.where(`${this.alias}.parentId IS NULL`);

		// if (options.isSubcategory) {
		selects.push('subcategories.id', 'subcategories.name');
		qb.leftJoin(`${this.alias}.subcategories`, 'subcategories');
		// }

		this.queryBuilderAddPagination(qb, options);
		qb.select(selects);

		if (options.isSubcategory) qb.addOrderBy('subcategories.orderBy');

		return qb.getManyAndCount();
	}

	getSubcategoriesByParentId(parentId: string, options: BasePaginationRequestDto) {
		const qb = this.createQb();
		qb.where(`${this.alias}.parentId = :parentId`, { parentId })
			.andWhere(`${this.alias}.deletedAt IS NULL`)
			.select([`${this.alias}.id`, `${this.alias}.name`]);

		this.queryBuilderAddPagination(qb, options);

		return qb.getManyAndCount();
	}

	cmsGetListCategory(query: CMSCategoryReqDto) {
		const qb = this.createQb();
		qb.select([`${this.alias}.id`, `${this.alias}.name`, `${this.alias}.createdAt`])
			.where(`${this.alias}.parentId is NULL`)
			.andWhere(`${this.alias}.deletedAt is NULL`);

		qb.orderBy(`${this.alias}.orderBy`, 'DESC').addOrderBy(`${this.alias}.createdAt`, 'DESC');

		if (query.name) {
			qb.andWhere(`${this.alias}.name like :name`, { name: `%${transformQuery(query.name)}%` });
		}

		this.queryBuilderAddPagination(qb, query);
		return qb.getManyAndCount();
	}

	getDetailCategory(id: string) {
		const qb = this.createQb();

		qb.select([
			`${this.alias}.id`,
			`${this.alias}.status`,
			`${this.alias}.name`,
			'subcategories.id',
			'subcategories.name',
		])
			.where(`${this.alias}.parentId IS NULL`)
			.andWhere(`${this.alias}.deletedAt is NULL`)
			.andWhere(`subcategories.deletedAt is NULL`)
			.andWhere(`${this.alias}.id = :id`, { id: id });
		qb.leftJoin(`${this.alias}.subcategories`, 'subcategories');

		return qb.getOne();
	}

	getMaxOrderBy() {
		const qb = this.createQb();
		qb.select(`MAX(${this.alias}.orderBy)`, 'max');

		return qb.getRawOne();
	}
}
