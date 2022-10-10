import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('CMS_PRODUCT')
  .setDescription('NEWS API description')
  .setVersion('1.0')
  .addTag('CMS_PRODUCT')
  .addBearerAuth()
  .build();

export function initSwagger(app: INestApplication, path?: string) {
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(path || 'api/docs', app, document);
}
