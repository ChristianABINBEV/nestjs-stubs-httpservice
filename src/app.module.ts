import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { HealthIndicator } from './health/health';

@Module({
  imports: [
    TerminusModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.ENVIRONMENT}`,
    }),
  ],
  providers: [HealthIndicator],
})
export class AppModule {}
