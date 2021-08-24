import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpException } from '@nestjs/common';

export interface Response<T> {
  data: T;
  status_code: number;
  timestamp: string;
}

@Injectable()
export class GlobalResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response<T>> {
    const serverResponse = context.getArgByIndex(1);

    return next.handle().pipe(
      map((data) => ({
        data,
        status_code: serverResponse.statusCode,
        timestamp: new Date().toISOString(),
      })),
      catchError((error) => {
        if (error instanceof HttpException) {
          return throwError(
            () => new HttpException(error.getResponse(), error.getStatus())
          );
        }

        return throwError(() => error);
      })
    );
  }
}
