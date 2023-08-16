import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const apiKey = '07065cd15bd1ea6d118163c3ce0a5c0d3c52f8d9a99f40e2293c45fdf00d26e3';
    const isApiRequest = request.url.startsWith('https://min-api.cryptocompare.com/data/');

    if (isApiRequest) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Apikey ${apiKey}`
        }
      });
    }

    return next.handle(request);
  }
}
