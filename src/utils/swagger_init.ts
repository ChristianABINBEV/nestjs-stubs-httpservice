import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import * as fs from 'fs';

const swaggerOpt = {
  swaggerOptions: {
    filter: true,
    showRequestDuration: true,
    classValidatorShim: true,
  },
};

export function initSwagger(app: INestApplication) {
  const name = process.env.npm_package_name;
  const config = new DocumentBuilder()
    .setTitle(process.env.APP_NAME)
    .setDescription(name)
    .setVersion(process.env.npm_package_version)
    .addApiKey({ name: 'x-api-key', type: 'apiKey' }, 'api-key')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('open-api', app, document, swaggerOpt);
  fs.writeFileSync(`./swagger-${name}.json`, JSON.stringify(document));
}
