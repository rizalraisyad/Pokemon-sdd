import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RequestLoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(RequestLoggerInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, headers, query, body } = request;
    const requestId = request.headers['x-request-id'] || this.generateRequestId();

    this.logger.log(
      `Incoming Request: ${method} ${url} | Query: ${JSON.stringify(query)} | RequestID: ${requestId}`,
    );

    const startTime = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - startTime;
          this.logger.log(
            `Request Completed: ${method} ${url} | Duration: ${duration}ms | RequestID: ${requestId}`,
          );
        },
        error: (error) => {
          const duration = Date.now() - startTime;
          this.logger.error(
            `Request Failed: ${method} ${url} | Duration: ${duration}ms | Error: ${error.message} | RequestID: ${requestId}`,
          );
        },
      }),
    );
  }

  private generateRequestId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

