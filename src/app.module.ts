import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { HealthIndicator } from './health/health';
import { AppController } from './app.controller';
import { validationSchema } from './utils/environment.validations';
import { ApiKeyStrategy } from './auth/apikey.strategy';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [
    TerminusModule,
    ConfigModule.forRoot({
      validationSchema,
      envFilePath: '.env',
      isGlobal: true,
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [HealthIndicator, ApiKeyStrategy],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(AppController);
  }
}
