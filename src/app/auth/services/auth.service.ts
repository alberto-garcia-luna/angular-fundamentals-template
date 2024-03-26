import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { SessionStorageService } from './session-storage.service';

const AuthApiUrl: string = 'http://localhost:4000';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isAuthorized$$ = new BehaviorSubject<boolean>(false);
    constructor(private http: HttpClient,
        private sessionStorageService: SessionStorageService) {}
    
    login(user: User) { // replace 'any' with the required interface
        // Add your code here
        return this.http.post<AuthResponse>(`${AuthApiUrl}/login`, user)
            .pipe(map(response => {
                if(response.successful) {
                    this.sessionStorageService.setToken(response.result);
                    this.isAuthorised = true;   
                }                
            }));
    }

    logout(authToken: string) {
        // Add your code here
        return this.http.delete(`${AuthApiUrl}/logout`)
            .pipe(map(() => {
                this.sessionStorageService.deleteToken();
                this.isAuthorised = false;
            }));
    }

    register(user: User) { // replace 'any' with the required interface
        // Add your code here
        return this.http.post(`${AuthApiUrl}/register`, user);
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

export interface AuthResponse {
    successful: boolean;
    result: string;
    user: User;
}

export interface User {
    name: string;
    email: string;
    password: string;
}