import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { log } from 'console';
import { GlobalResponseInterceptor } from './interceptors/response.transformer';
import { HttpExceptionFilter } from './filters/http-exceptions.filter';
import { validateEnv } from './utils/environment.validations';
import { loadEnvVars } from './infrastructure/azure_init';
import { initSwagger } from './utils/swagger_init';
import { AppModule } from './app.module';

async function bootstrap() {
  await loadEnvVars();
  validateEnv();
  const port = process.env.APP_PORT ? Number(process.env.APP_PORT) : 8080;
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new GlobalResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  initSwagger(app);

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
