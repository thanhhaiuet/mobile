import { AppModule } from './app.module';
import { initSwagger } from './swagger';
import { EEnvKey } from '@constants/env.constants';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);

  app.setGlobalPrefix(
    configService.get<string>(EEnvKey.GLOBAL_PREFIX) || 'api',
  );
  app.enableCors();

  // Swagger
  if (configService.get<string>(EEnvKey.SWAGGER_PATH)) {
    initSwagger(app, configService.get<string>(EEnvKey.SWAGGER_PATH));
  }

  app.useStaticAssets(join(__dirname, '../', 'static'));

  await app.listen(configService.get<number>(EEnvKey.PORT) || 3000);
}
bootstrap();
