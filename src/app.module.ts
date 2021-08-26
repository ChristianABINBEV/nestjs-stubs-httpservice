import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { HealthIndicator } from './health/health';
import { AppController } from './app.controller';
import { validationSchema } from './utils/environment.validations';

@Module({
  imports: [
    TerminusModule,
    ConfigModule.forRoot({
      validationSchema,
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [HealthIndicator],
})
export class AppModule {}
