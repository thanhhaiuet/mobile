import { ResDto } from '@shared/decorators/dto.decorator';
import { BasePaginationResponseDto } from '@shared/dtos/base-request.dto';

class Info {
	@ResDto() id: string;

	@ResDto() name: string;
}
class CmsCategoryData extends Info {
	@ResDto() status: number;
	@ResDto() createdAt: Date;
}
class CategoryDto extends Info {
	@ResDto() parentId: string;

	@ResDto({ type: [Info] }) subcategories: Info[];
}

export class CMSDetailCategoryResDto {
	@ResDto() id: string;
	@ResDto() name: string;
	@ResDto() status: number;
	@ResDto({ type: [Info] }) subcategories: Info[];
}

export class ListCategoryResDto {
	@ResDto({ type: [CategoryDto] }) data: CategoryDto[];
}

export class CMSListCategoryResDto extends BasePaginationResponseDto {
	@ResDto({ type: [CmsCategoryData] }) data: CmsCategoryData[];

	constructor(data: BasePaginationResponseDto) {
		super();
		Object.assign(this.data, data);
	}
}
