import { Exclude } from 'class-transformer';

import { DtoNumber, DtoString } from '@shared/decorators/dto.decorator';

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
