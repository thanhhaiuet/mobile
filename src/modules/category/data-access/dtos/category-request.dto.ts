import { Exclude, Transform, Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';

import { EStatusCategory } from '@constants/entity.constants';

import { DtoBoolean, DtoEnum, DtoProp, DtoString } from '@shared/decorators/dto.decorator';
import { BasePaginationRequestDto } from '@shared/dtos/base-request.dto';
import { optionalBooleanMapper } from '@shared/utils/transform-query';

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

