import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { EDirection } from '@constants/api.constants';

import { DtoEnum, DtoInt, DtoString } from '@shared/decorators/dto.decorator';
import { AutoConvertNumber } from '@shared/pipes/decorator-convert-http-query';

export class BaseParamDto {
	@DtoString()
	id: string;
}

export class BasePaginationRequestDto {
	@DtoInt({ min: 1, optional: true })
	@AutoConvertNumber(BasePaginationRequestDto)
	pageSize: number;

	@DtoInt({ min: 1, optional: true })
	@AutoConvertNumber(BasePaginationRequestDto)
	page: number;
}

export class BasePaginationWithSortRequestDto {
	@DtoInt({ min: 1, optional: true })
	@AutoConvertNumber(BasePaginationRequestDto)
	limit: number;

	@DtoInt({ min: 1, optional: true })
	@AutoConvertNumber(BasePaginationRequestDto)
	page: number;

	@DtoString({ optional: true })
	sortBy: string;

	@DtoEnum(EDirection, { optional: true })
	direction: EDirection;
}

export class BasePaginationResponseDto<T = any> {
	@ApiProperty()
	@Expose()
	total: number;

	data: T[];

	static convertToPaginationResponse<T = any>(data: [any[], number], currentPage?: number) {
		return {
			data: data[0],
			total: data[1],
			currentPage,
		} as BasePaginationResponseDto<T>;
	}
}
