import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

import { EEnvKey } from '@constants/env.constants';

import { AppModule } from './app.module';
import { initSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

  const configService = app.get(ConfigService);

  app.setGlobalPrefix(configService.get<string>(EEnvKey.GLOBAL_PREFIX) || 'api');
  app.enableCors();

  // Swagger
  if (configService.get<string>(EEnvKey.SWAGGER_PATH)) {
    initSwagger(app, configService.get<string>(EEnvKey.SWAGGER_PATH));
  }

  app.useStaticAssets(join(__dirname, '../', 'images'));

  console.log(join(__dirname, '..'));


  await app.listen(configService.get<number>(EEnvKey.PORT) || 3000);
}
bootstrap();
