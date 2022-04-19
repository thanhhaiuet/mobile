import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { envValidate } from './env.validation';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      validate: envValidate,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class CustomConfigModule {}
