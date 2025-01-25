
import { catchError, concatMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TokenService } from '../authentication/services/token.service';
import { AuthService } from '../shared/auth/auth.service';
import { TokenDto } from '../models/token.dto';

const AUTHORIZATION = 'Authorization';
const BEARER = 'Bearer ';

@Injectable()
export class AdminInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private authService: AuthService
    ) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (!this.tokenService.isLogged()) {
          return next.handle(request);
        }
        
        const token = this.tokenService.getToken();
        
        // Verifica si el token es null y lanza un error o maneja la situación
        if (!token) {
          // Aquí podrías manejar la situación, tal vez redirigiendo al login o lanzando un error
          throw new Error('Token no disponible');
        }
      
        let intReq = this.addToken(request, token);
        return next.handle(intReq).pipe(
          catchError((err: HttpErrorResponse) => {
            if (err.status === 401) {
              const dto: TokenDto = new TokenDto(token);
              return this.authService.refresh(dto).pipe(
                concatMap((data: any) => {
                  console.log('refreshing...');
                  this.tokenService.setToken(data.token);
                  intReq = this.addToken(request, data.token);
                  return next.handle(intReq);
                })
              );
            } else {
              this.tokenService.logOut();
              return throwError(err);
            }
          })
        );
      }
      

  private addToken(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
  }
}

export const interceptorProvider = [{ provide: HTTP_INTERCEPTORS, useClass: AdminInterceptor, multi: true }];