import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class UserStoreService {
    private name$$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    private isAdmin$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    name$: Observable<string> = this.name$$.asObservable();
    isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable();

    constructor (private userService: UserService) {}

    getUser() {
        // Add your code here
        this.userService.getUser()
            .subscribe({
                next: (response) => {
                    if (response)
                        this.name$$.next(response.name);
                    else
                        this.name$$.next('');
                },
                error: (err) => { this.name$$.error(err) }
            });

        return this.name$;
    }

    get isAdmin() {
        // Add your code here. Get isAdmin$$ value
        return this.isAdmin$$.getValue();
    }

    set isAdmin(value: boolean) {
        // Add your code here. Change isAdmin$$ value
        this.isAdmin$$.next(value);
    }
}
