import { DtoString } from "@shared/decorators/dto.decorator";
import { IsEqualsTo } from "@shared/dtos/validator/is-equals-to.decorator";
import { Exclude, Transform } from "class-transformer";
import { IsEmail } from "class-validator";

@Exclude()
export class ELoginReqDto {

  @DtoString({expose: true, maxLength: 50})
  @IsEmail()
  @Transform(({ value }: { value: string }) => value?.trim()?.toLowerCase())
  email: string;

  @DtoString({expose: true, maxLength: 20})
  password: string;
}

@Exclude()
export class ERegisterReqDto {

  @DtoString({expose: true, maxLength: 50})
  @IsEmail()
  @Transform(({ value }: { value: string }) => value?.trim()?.toLowerCase())
  email: string;

  @DtoString({expose: true, maxLength: 20})
  password: string;

  @DtoString({expose: true, maxLength: 20})
  @IsEqualsTo('password')
  confirmPassword: string;

  @DtoString({expose: true, maxLength: 50})
  username: string;
}

