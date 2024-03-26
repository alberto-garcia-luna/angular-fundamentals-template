import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate {
    constructor(private authService: AuthService,
        private router: Router) {}
    // Add your code here
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
        boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (this.authService.isAuthorised) {
            return true;
        }

        this.router.navigate([this.authService.getLoginUrl()]);
        return false;
    }
}
