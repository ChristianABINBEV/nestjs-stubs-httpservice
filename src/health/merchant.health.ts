import {
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
  HealthCheckError,
  HealthCheckResult,
} from '@nestjs/terminus';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MerchantHealthIndicator {
  constructor(
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
    private db: TypeOrmHealthIndicator,
    private dns: HttpHealthIndicator
  ) {}

  async isHealthy(): Promise<HealthCheckResult> {
    try {
      return this.health.check([
        async () => this.memory.checkHeap('memory_heap', 200 * 1024 * 1024),
        async () => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
        async () => this.db.pingCheck('database', { timeout: 3000 }),
        () => this.dns.pingCheck('google', 'http://google.com'),
      ]);
    } catch (error) {
      throw new HealthCheckError('Health check failed', error);
    }
  }
}
