import { Exclude } from 'class-transformer';

import { EProfileSort } from '@constants/api.constants';

import { DtoEnum, DtoNumber, DtoString } from '@shared/decorators/dto.decorator';
import { BasePaginationRequestDto } from '@shared/dtos/base-request.dto';

@Exclude()
export class CreateEstimate {
  @DtoNumber({ expose: true })
  price: number;

  @DtoNumber({ expose: true })
  timeComplete: number;

  @DtoString({ expose: true })
  userId: string;

  @DtoString({ expose: true })
  productId: string;
}

@Exclude()
export class DetailProduct {
  @DtoString({ expose: true })
  productId: string;
}

@Exclude()
export class GetListProductEstimated extends BasePaginationRequestDto {
  @DtoEnum(EProfileSort, { expose: true, optional: true })
  sortBy: EProfileSort;
}
