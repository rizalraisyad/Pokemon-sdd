export class AppConfig {
  constructor(
    public readonly environment: 'development' | 'staging' | 'production',
    public readonly port: number,
    public readonly corsOrigin: string,
    public readonly logLevel: 'debug' | 'info' | 'warn' | 'error',
    public readonly apiVersion: string,
  ) {
    this.validate();
  }

  private validate(): void {
    const validEnvironments = ['development', 'staging', 'production'];
    if (!validEnvironments.includes(this.environment)) {
      throw new Error(`Invalid environment: ${this.environment}`);
    }

    if (this.port < 1000 || this.port > 65535) {
      throw new Error(`Port must be between 1000 and 65535, got ${this.port}`);
    }

    const validLogLevels = ['debug', 'info', 'warn', 'error'];
    if (!validLogLevels.includes(this.logLevel)) {
      throw new Error(`Invalid log level: ${this.logLevel}`);
    }

    if (!/^v?\d+$/.test(this.apiVersion)) {
      throw new Error(`API version must follow semantic versioning, got ${this.apiVersion}`);
    }
  }

  static fromEnv(env: Record<string, string>): AppConfig {
    return new AppConfig(
      (env.NODE_ENV || 'development') as 'development' | 'staging' | 'production',
      parseInt(env.PORT || '3000', 10),
      env.CORS_ORIGIN || 'http://localhost:3001',
      (env.LOG_LEVEL || 'info') as 'debug' | 'info' | 'warn' | 'error',
      env.API_VERSION || 'v1',
    );
  }
}

