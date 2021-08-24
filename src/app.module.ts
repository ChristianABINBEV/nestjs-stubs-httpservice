import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { MerchantHealthIndicator } from './health/merchant.health';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.ENVIRONMENT}`,
    }),
  ],
  controllers: [],
  providers: [MerchantHealthIndicator],
})
export class AppModule {}
