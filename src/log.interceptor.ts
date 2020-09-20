import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('LogInterceptor Before...');
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`After LogInterceptor... ${Date.now() - now}ms`)),
      );
  }
}
