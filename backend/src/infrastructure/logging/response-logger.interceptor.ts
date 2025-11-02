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
export class ResponseLoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ResponseLoggerInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const { method, url } = request;
    const requestId = request.headers['x-request-id'] || 'unknown';

    return next.handle().pipe(
      tap({
        next: (data) => {
          const statusCode = response.statusCode;
          const responseSize = JSON.stringify(data).length;

          this.logger.log(
            `Response Sent: ${method} ${url} | Status: ${statusCode} | Size: ${responseSize} bytes | RequestID: ${requestId}`,
          );

          if (statusCode >= 400 && statusCode < 500) {
            this.logger.warn(
              `Client Error: ${method} ${url} | Status: ${statusCode} | RequestID: ${requestId}`,
            );
          } else if (statusCode >= 500) {
            this.logger.error(
              `Server Error: ${method} ${url} | Status: ${statusCode} | RequestID: ${requestId}`,
            );
          }
        },
        error: (error) => {
          const statusCode = error.status || 500;
          this.logger.error(
            `Error Response: ${method} ${url} | Status: ${statusCode} | Error: ${error.message} | RequestID: ${requestId}`,
            error.stack,
          );
        },
      }),
    );
  }
}

