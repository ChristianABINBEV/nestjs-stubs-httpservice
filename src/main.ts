import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filters/http-exceptions.filter';
import { log } from 'console';
import { ValidationPipe } from '@nestjs/common';
import { GlobalResponseInterceptor } from './interceptors/response.transformer';

async function bootstrap() {
  const port = process.env.APP_PORT ? Number(process.env.APP_PORT) : 8080;
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle(process.env.APP_NAME + ' http service')
    .setDescription(process.env.APP_AUTHOR)
    .setVersion(process.env.APP_VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new GlobalResponseInterceptor());

  await app.listen(port).then(() => {
    log(`
     ============================================
     =  {{ template }} execution info:
     =  PORT: ${port}
     =  NAME: ${process.env.APP_NAME}
     ============================================
     `);
  });
}

bootstrap();
