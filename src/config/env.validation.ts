import { plainToClass } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';

import { EEnvKey, ENodeEnvironment } from '@constants/env.constants';

export function envValidate(config: Record<string, any>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

class EnvironmentVariables implements Record<EEnvKey, number | string> {
  @IsEnum(ENodeEnvironment)
  @IsNotEmpty()
  NODE_ENV: ENodeEnvironment;

  @IsNumber()
  @IsOptional()
  PORT: number;

  @IsString()
  @IsOptional()
  GLOBAL_PREFIX: string;

  @IsString()
  @IsOptional()
  SWAGGER_PATH: string;

  @IsString()
  @IsNotEmpty()
  SECRET_JWT: string;

  @IsString()
  @IsNotEmpty()
  REFRESH_TOKEN_SECRET_JWT: string;

  @IsString()
  @IsOptional()
  DATABASE_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  DATABASE_PORT: number;

  @IsString()
  @IsNotEmpty()
  DATABASE_USER: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  DATABASE: string;

  @IsNumber()
  @IsOptional()
  RATE_LIMITER_TTL: number;

  @IsNumber()
  @IsOptional()
  RATE_LIMITER_LIMIT: number;

  @IsNumber()
  @IsNotEmpty()
  BCRYPT_ROUND: number;

  // @IsString()
  // @IsOptional()
  // AWS_SES_ACCESS_KEY: string;

  // @IsString()
  // @IsOptional()
  // AWS_SES_SECRET_KEY: string;

  // @IsString()
  // @IsOptional()
  // AWS_SES_REGION: string;

  // @IsString()
  // @IsOptional()
  // AWS_SES_SEND_FROM: string;

  // @IsString()
  // @IsNotEmpty()
  // API_ENDPOINT: string;

  // @IsString()
  // @IsNotEmpty()
  // CLIENT_URL: string;

  // @IsString()
  // @IsNotEmpty()
  // AWS_S3_ACCESS_KEY: string;

  // @IsString()
  // @IsNotEmpty()
  // AWS_S3_SECRET_ACCESS_KEY: string;

  // @IsString()
  // @IsNotEmpty()
  // AWS_S3_REGION: string;

  // @IsString()
  // @IsNotEmpty()
  // AWS_S3_BUCKET: string;

  // @IsString()
  // @IsNotEmpty()
  // AWS_CLOUDFRONT: string;

  // @IsString()
  // @IsOptional()
  // TEAM_SERVER_NOTIFIER: string;

  // @IsString()
  // @IsOptional()
  // ARIA_URL_SIGN_UP_AND_PAYMENT: string;

  // @IsString()
  // @IsOptional()
  // ARIA_URL_SETTLEMENT: string;

  // @IsString()
  // @IsOptional()
  // ARIA_URL_REFUND: string;

  // @IsString()
  // @IsOptional()
  // ARIA_URL_CREATE_PRODUCTS: string;

  // @IsString()
  // @IsOptional()
  // ARIA_URL_UPDATE_PRODUCTS: string;

  // @IsString()
  // @IsOptional()
  // ARIA_URL_DELETE_PRODUCTS: string;

  // @IsString()
  // @IsOptional()
  // URL_GMO_AUTHORIZE: string;

  // @IsString()
  // @IsOptional()
  // URL_GMO_TOKEN: string;

  // @IsString()
  // @IsOptional()
  // URL_GMO_TRANSFER: string;

  // @IsString()
  // @IsOptional()
  // URL_GMO_LIST_ACCOUNT: string;

  @IsString()
  @IsOptional()
  CRAWL: string;

  @IsString()
  @IsOptional()
  APIKEY: string;
}
