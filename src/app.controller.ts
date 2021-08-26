import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckResult } from '@nestjs/terminus';
import { HealthIndicator } from './health/health';

@Controller('{{ mainModule }}')
export class AppController {
  constructor(private healthIndicator: HealthIndicator) {}

  @Get('health')
  @HealthCheck()
  async isHealth(): Promise<HealthCheckResult> {
    return await this.healthIndicator.isHealthy();
  }
}
