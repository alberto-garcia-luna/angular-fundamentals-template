import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { SessionStorageService } from '../services/session-storage.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    // Add your code here
    constructor(private router: Router,
        private sessionStorageService: SessionStorageService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.sessionStorageService.getToken();
        if (!token){
            return next.handle(req.clone());
        }
        
        const clonedReq = req.clone({
            headers: req.headers.set(
                'Authorization', token
            )
        });
        
        return next.handle(clonedReq)
            .pipe(tap(
                succ => {},
                err => {
                    if (err.status === 401) {
                        this.router.navigateByUrl('/login');
                    }
                }
            ));
    }
}
