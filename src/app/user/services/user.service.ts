import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserResponse } from '@app/models/models';
import { Observable, map } from 'rxjs';

const UsersApiUrl: string = 'http://localhost:4000/Users';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) {}

    getUser(): Observable<User> {
        // Add your code here
        return this.http.get<UserResponse>(`${UsersApiUrl}/me`)
            .pipe(map(response => {
                return response.result;
            }));
    }
}