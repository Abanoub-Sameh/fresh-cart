import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let updatedReq:any

    if(localStorage.getItem('token') !== null){
        updatedReq = request.clone({  
        headers: request.headers.set('token' , localStorage.getItem('token')! )
      })
    }
    else{
      updatedReq = request
    }
    return next.handle(updatedReq);
  }
}
