import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { ErrorService } from '../services/error.service';

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const _errorService = inject(ErrorService);

  if (isPlatformBrowser(platformId)) {
    let token: string | null = null;
    
    try {
      token = localStorage.getItem('token');
    } catch (e) {
      console.error('Error al acceder a localStorage:', e);
      return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            router.navigate(['/login']);
          }
          return throwError(() => error);
        })
      );;
    }

    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      return next(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            _errorService.msjError(error);
            router.navigate(['/login']);
          }

          return throwError(() => error);
        })
      );
    }
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // _errorService.msjError(error);
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
