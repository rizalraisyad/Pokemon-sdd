export class ApiResponse<T> {
  constructor(
    public readonly success: boolean,
    public readonly data: T,
    public readonly message: string,
    public readonly timestamp: string,
    public readonly requestId: string,
  ) {
    this.validate();
  }

  private validate(): void {
    if (typeof this.success !== 'boolean') {
      throw new Error('Success must be a boolean');
    }

    if (!this.message || this.message.trim().length === 0) {
      throw new Error('Message must be a non-empty string');
    }

    try {
      new Date(this.timestamp);
    } catch {
      throw new Error(`Invalid timestamp format: ${this.timestamp}`);
    }

    if (!this.isValidUUID(this.requestId)) {
      throw new Error(`Request ID must be a valid UUID, got ${this.requestId}`);
    }
  }

  private isValidUUID(uuid: string): boolean {
    // Allow custom request ID format (timestamp-random)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const customIdRegex = /^[0-9]+-[a-z0-9]+$/i;
    return uuidRegex.test(uuid) || customIdRegex.test(uuid);
  }

  toJSON(): Record<string, unknown> {
    return {
      success: this.success,
      data: this.data,
      message: this.message,
      timestamp: this.timestamp,
      requestId: this.requestId,
    };
  }

  static success<T>(data: T, message: string = 'Success', requestId?: string): ApiResponse<T> {
    const id = requestId || this.generateRequestId();
    return new ApiResponse<T>(true, data, message, new Date().toISOString(), id);
  }

  static error(error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  }, requestId?: string): ErrorResponse {
    const id = requestId || this.generateRequestId();
    return new ErrorResponse(
      false,
      error,
      new Date().toISOString(),
      id,
    );
  }

  private static generateRequestId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

export class ErrorResponse {
  constructor(
    public readonly success: false,
    public readonly error: {
      code: string;
      message: string;
      details?: Record<string, unknown>;
    },
    public readonly timestamp: string,
    public readonly requestId: string,
  ) {
    this.validate();
  }

  private validate(): void {
    if (this.success !== false) {
      throw new Error('Error response success must be false');
    }

    if (!this.error.code || this.error.code.trim().length === 0) {
      throw new Error('Error code must be a non-empty string');
    }

    if (!this.error.message || this.error.message.trim().length === 0) {
      throw new Error('Error message must be a non-empty string');
    }

    try {
      new Date(this.timestamp);
    } catch {
      throw new Error(`Invalid timestamp format: ${this.timestamp}`);
    }

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const customIdRegex = /^[0-9]+-[a-z0-9]+$/i;
    if (!uuidRegex.test(this.requestId) && !customIdRegex.test(this.requestId)) {
      throw new Error(`Request ID must be a valid UUID or custom format, got ${this.requestId}`);
    }
  }

  toJSON(): Record<string, unknown> {
    return {
      success: this.success,
      error: this.error,
      timestamp: this.timestamp,
      requestId: this.requestId,
    };
  }
}

