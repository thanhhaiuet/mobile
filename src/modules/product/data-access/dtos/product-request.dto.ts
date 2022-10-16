import { Exclude, Transform, Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';

import { EProfileSort, ESortBy } from '@constants/api.constants';
import { EStatusCategory } from '@constants/entity.constants';

import { DtoBoolean, DtoEnum, DtoNumber, DtoProp, DtoString } from '@shared/decorators/dto.decorator';
import { BasePaginationRequestDto } from '@shared/dtos/base-request.dto';
import { optionalBooleanMapper } from '@shared/utils/transform-query';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ListCategoryRqDto extends BasePaginationRequestDto {
  @DtoBoolean({ expose: true, optional: true })
  @Transform(({ value }) => optionalBooleanMapper.get(value))
  isSubcategory: boolean;
}

export class CMSCategoryReqDto extends BasePaginationRequestDto {
  @DtoString({ expose: true, maxLength: 35, optional: true })
  name: string;

  @DtoEnum(EStatusCategory, { expose: true, optional: true })
  status: EStatusCategory;
}

@Exclude()
export class CMSCategoryBodyDto {
  @DtoString({ expose: true, maxLength: 50 })
  parentName: string;

  @DtoProp(true)
  @IsArray()
  @MaxLength(50, { each: true })
  @ArrayNotEmpty()
  @IsString({ each: true })
  childCategory: string[];
}

class UpdateCategoryBodyData {
  @DtoString({ expose: true, optional: true })
  id: string;

  @DtoString({ expose: true, maxLength: 50 })
  name: string;
}
@Exclude()
export class UpdateCategoryBodyDto {
  @DtoEnum(EStatusCategory, { expose: true })
  status: EStatusCategory;

  @DtoString({ expose: true, maxLength: 50, optional: true })
  parentName: string;

  @DtoProp(true, { type: [UpdateCategoryBodyData] })
  @IsOptional()
  @Type(() => UpdateCategoryBodyData)
  @ValidateNested({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  childCategory: UpdateCategoryBodyData[];
}

@Exclude()
export class CreateProductDto {
  @DtoString({ expose: true, maxLength: 100 })
  name: string;

  @DtoString({ expose: true, maxLength: 1100 })
  description: string;

  @DtoNumber({ expose: true })
  priceStart: number;

  @DtoNumber({ expose: true })
  priceEnd: number;

  @DtoNumber({ expose: true })
  timeComplete: number;

  @DtoString({ expose: true })
  categoryId: string;

  @DtoString({ expose: true })
  userId: string;

  @DtoString({ expose: true, maxLength: 200 })
  image: string;
}

@Exclude()
export class ListProduct extends BasePaginationRequestDto {
  @DtoString({ expose: true, maxLength: 100, optional: true })
  name: string;

  @DtoEnum(ESortBy, { expose: true, optional: true })
  sortBy: ESortBy;

  @DtoString({ expose: true, maxLength: 1000, optional: true })
  categoryId: string;
}

@Exclude()
export class ListProductProfileCreated extends BasePaginationRequestDto {
  @DtoEnum(EProfileSort, { expose: true, optional: true })
  sortBy: EProfileSort;
}

