import { Injectable } from '@nestjs/common';
import { EntityManager, In } from 'typeorm';

import { EError } from '@constants/error.constants';

import { CategoryEntity } from '@entities/category.entity';

import { BasePaginationRequestDto, BasePaginationResponseDto, BaseParamDto } from '@shared/dtos/base-request.dto';
import { httpBadRequest, httpNotFound } from '@shared/exceptions/http-exception';
import { getNowUtc } from '@shared/utils/time.utils';

import { CategoryRepository } from './category.repository';
import { CMSCategoryBodyDto, CMSCategoryReqDto, ListCategoryRqDto } from './dtos/category-request.dto';

@Injectable()
export class CategoryService {
	constructor(private readonly categoryRepo: CategoryRepository) {}

	async getCategories(options: ListCategoryRqDto) {
		const categories = await this.categoryRepo.getCategories(options);

		return BasePaginationResponseDto.convertToPaginationResponse(categories, options.page);
	}

	async getSubcategories(id: string, options: BasePaginationRequestDto) {
		const subcategories = await this.categoryRepo.getSubcategoriesByParentId(id, options);

		return BasePaginationResponseDto.convertToPaginationResponse(subcategories, options.page);
	}

	async cmsGetListCategory(query: CMSCategoryReqDto) {
		const data = await this.categoryRepo.cmsGetListCategory(query);
		return BasePaginationResponseDto.convertToPaginationResponse(data, query.page || 1);
	}

	async getDetailCategory(id: string) {
		const category = await this.categoryRepo.getDetailCategory(id);

		if (!category) httpNotFound('Record is not exit!');

		return category;
	}

	async addNewCategory(body: CMSCategoryBodyDto) {
		const findDuplicate = [...body.childCategory, body.parentName].filter(
			(categoryName, index) => [...body.childCategory, body.parentName].indexOf(categoryName) !== index,
		);

		if (findDuplicate.length !== 0) httpBadRequest(`Duplicate name [${findDuplicate}]`, EError.E_125);

		const category = await this.categoryRepo.findOne({ where: { name: body.parentName } });

		if (category) httpBadRequest('Category is exit!', EError.E_125);

		await this.categoryRepo.createTransaction(this.saveMultipleCategory.bind(this, body.parentName, body));
	}

	private async saveMultipleCategory(parentName: string, data: CMSCategoryBodyDto, manager: EntityManager) {
		const listCategory = data.childCategory.map((name, index) => {
			return {
				name: name,
			};
		});

		const category = manager.create(CategoryEntity, {
			name: parentName,
			parentId: null,
			subcategories: listCategory,
		});

		await manager.save(category);
	}
}
