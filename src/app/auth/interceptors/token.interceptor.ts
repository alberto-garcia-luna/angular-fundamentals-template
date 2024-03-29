import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { EMPTY, Observable, catchError, tap, throwError } from 'rxjs';
import { SessionStorageService } from '../services/session-storage.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    // Add your code here
    constructor(private sessionStorageService: SessionStorageService,
        private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.sessionStorageService.getToken();
        if (!token){
            return next.handle(request).pipe(
                catchError(err => {
                    if (err.status === 401 || err.status === 403) {
                        this.router.navigate(['/login']);
                    }
                    return throwError(() => err);
            }));
        }
        
        const clonedRequest = request.clone({
            headers: request.headers.set(
                'Authorization', token
            )
        });
        
        return next.handle(clonedRequest).pipe(
            catchError(err => {
                if (err.status === 401 || err.status === 403) {
                    this.router.navigate(['/login']);
                }
                return throwError(() => err);
        }));
    }
}
