export class HealthCheckResponse {
  constructor(
    public readonly status: 'healthy' | 'unhealthy' | 'degraded',
    public readonly timestamp: string,
    public readonly uptime: number,
    public readonly version: string,
    public readonly services?: Record<string, 'healthy' | 'unhealthy' | 'degraded'>,
  ) {
    this.validate();
  }

  private validate(): void {
    const validStatuses = ['healthy', 'unhealthy', 'degraded'];
    if (!validStatuses.includes(this.status)) {
      throw new Error(`Invalid status: ${this.status}`);
    }

    if (this.uptime < 0) {
      throw new Error(`Uptime must be non-negative, got ${this.uptime}`);
    }

    if (!/^v?\d+\.\d+\.\d+$/.test(this.version)) {
      throw new Error(`Version must follow semantic versioning, got ${this.version}`);
    }

    try {
      new Date(this.timestamp);
    } catch {
      throw new Error(`Invalid timestamp format: ${this.timestamp}`);
    }
  }

  toJSON(): Record<string, unknown> {
    return {
      status: this.status,
      timestamp: this.timestamp,
      uptime: this.uptime,
      version: this.version,
      ...(this.services && { services: this.services }),
    };
  }
}

