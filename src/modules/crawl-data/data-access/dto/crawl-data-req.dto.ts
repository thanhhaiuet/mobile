import { ECateGoryNew } from "@constants/api.constants";
import { DtoDatetime, DtoEnum, DtoString } from "@shared/decorators/dto.decorator";
import { BasePaginationRequestDto } from "@shared/dtos/base-request.dto";
import { Exclude } from "class-transformer";

@Exclude()
export class getSearchNewsReqDto extends BasePaginationRequestDto{
  @DtoString({optional: true, maxLength: 500, expose: true})
  q: string;

  @DtoString({optional: true, expose: true})
  searchIn: string;
  
  @DtoString({optional: true, expose: true})
  sortBy: string

  @DtoDatetime({optional: true, expose: true})
  from: Date

  @DtoDatetime({optional: true, expose: true})
  to: Date;

  @DtoString({optional: true, expose: true})
  sources: string;

  @DtoString({optional: true, expose: true})
  domains: string;

  @DtoString({optional: true, expose: true})
  language: string;

  
}

@Exclude()
export class getTopHeadlinesReqDto extends BasePaginationRequestDto {

  @DtoString({optional: true, expose: true})
  country: string;

  @DtoEnum(ECateGoryNew, {optional: true, expose: true})
  ECateGoryNew: ECateGoryNew;

  @DtoString({optional: true, expose: true})
  sources: string;

  @DtoString({optional: true, expose: true})
  q: string;
}

@Exclude()
export class getNewsSourcesReqDto {

  @DtoString({optional: true, expose: true})
  country: string;

  @DtoEnum(ECateGoryNew, {optional: true, expose: true})
  ECateGoryNew: ECateGoryNew;

  @DtoString({optional: true, expose: true})
  language: string;

}




