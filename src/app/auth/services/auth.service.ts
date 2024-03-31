import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import { AuthResponse, User } from '@app/models/models';

const AuthApiUrl: string = 'http://localhost:4000';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthorized$$ = new BehaviorSubject<boolean>(false);
    private name$$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    private isAdmin$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    isAuthorized$: Observable<boolean> = this.isAuthorized$$.asObservable();
    name$: Observable<string> = this.name$$.asObservable();
    isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable();

    constructor(private http: HttpClient,
        private sessionStorageService: SessionStorageService) {
    }
    
    login(user: User) { // replace 'any' with the required interface
        // Add your code here
        this.http.post<AuthResponse>(`${AuthApiUrl}/login`, user)
            .subscribe({
                next: (response) => {
                    if (response.successful) {
                        this.sessionStorageService.setToken(response.result);
                        this.name$$.next(response.user.name);
                        this.isAdmin$$.next(response.user.email.includes('admin'));
                        this.isAuthorized$$.next(true);
                    } else {
                        this.isAuthorized$$.next(false);
                        throwError(() => { 'Login execution was not successful.' });
                    }
                },
                error: (err) => { this.isAuthorized$$.error(err) },
            });

        return this.isAuthorized$;
    }

    logout(authToken: string) {
        // Add your code here
        this.http.delete(`${AuthApiUrl}/logout`)
            .subscribe({
                next: () => {
                    this.sessionStorageService.deleteToken();
                    this.isAuthorized$$.next(false);
                },
                error: (err) => { this.isAuthorized$$.error(err) },
            });

        return this.isAuthorized$;
    }

    register(user: User) { // replace 'any' with the required interface
        // Add your code here
        this.http.post(`${AuthApiUrl}/register`, user)
            .subscribe({
                next: () => { this.login(user); },
                error: (err) => { this.isAuthorized$$.error(err) },
            });
        
        return this.isAuthorized$;
    }

    get isAuthorised(): boolean {
        // Add your code here. Get isAuthorized$$ value
        return this.isAuthorized$$.getValue();
    }

    set isAuthorised(value: boolean) {
        // Add your code here. Change isAuthorized$$ value
        this.isAuthorized$$.next(value);
    }

    getLoginUrl(): string {
        // Add your code here
        return '/login';
    }

    getCoursesUrl(): string {
        return '/courses';
    }
}