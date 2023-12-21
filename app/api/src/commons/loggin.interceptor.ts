import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    const userAgent = request.get('user-agent') || '';
    const headers = request.headers;

    const { ip, method, path: url } = request;

    //User Id requesting:  ${payload.sub}
    this.logger.log(
      `${method} ${url} ${userAgent} ${ip}:
        ${context.getClass().name} ${context.getHandler.name} invoked `,
    );

    return next.handle().pipe(
      tap((res) => {
        const response = context.switchToHttp().getResponse();

        const { statusCode, statusMessage } = response;

        this.logger.log(
          `${method} ${url} ${statusCode} ${statusMessage}:
            ${context.getClass().name} ${
              context.getHandler.name
            } completed in ${Date.now() - now}ms`,
        );

        this.logger.debug('Response:', res);
      }),
    );
  }
}
