import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@nestjs/config';

import { validationSchema } from './utils/environment.validations';
import { AuthMiddleware } from './middleware/auth.middleware';
import { DatabaseModule } from './database/database.module';
import { HealthIndicator } from './health/health';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TerminusModule,
    ConfigModule.forRoot({
      validationSchema,
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [HealthIndicator],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(AppController);
  }
}
