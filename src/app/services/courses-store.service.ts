import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Author, Course, CoursesService } from './courses.service';

@Injectable({
    providedIn: 'root'
})
export class CoursesStoreService {
    private isLoading$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private courses$$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
    private authors$$: BehaviorSubject<Author[]> = new BehaviorSubject<Author[]>([]);

    isLoading$: Observable<boolean> = this.isLoading$$.asObservable();
    courses$: Observable<Course[]> = this.courses$$.asObservable();
    authors$: Observable<Author[]> = this.authors$$.asObservable();

    constructor(private coursesService: CoursesService) {}

    getAll() {
        // Add your code here
        this.isLoading$$.next(true);
        this.coursesService.getAll()
            .subscribe({
                next: (response) => {
                    this.courses$$.next(response);
                },
                error: (err) => { this.courses$$.error(err) },
                complete: () => { this.isLoading$$.next(false); }
        });

        return this.courses$;
    }

    createCourse(course: Course) { // replace 'any' with the required interface
        // Add your code here
        this.isLoading$$.next(true);
        this.coursesService.createCourse(course)
            .subscribe({
                next: () => { this.getAll() },
                error: (err) => { this.courses$$.error(err) },
                complete: () => { this.isLoading$$.next(false); }
        });
        
        return this.courses$;
    }

    getCourse(id: string) {
        // Add your code here
        this.isLoading$$.next(true);
        this.coursesService.getCourse(id)
            .subscribe({
                next: (response) => {
                    this.courses$$.next([response]);
                },
                error: (err) => { this.courses$$.error(err) },
                complete: () => { this.isLoading$$.next(false); }
        });
        
        return this.courses$;
    }

    editCourse(id: string, course: Course) { // replace 'any' with the required interface
        // Add your code here
        this.isLoading$$.next(true);
        this.coursesService.editCourse(id, course)
            .subscribe({
                next: () => { this.getAll() },
                error: (err) => { this.courses$$.error(err) },
                complete: () => { this.isLoading$$.next(false); }
        });
        
        return this.courses$;
    }

    deleteCourse(id: string) {
        // Add your code here        
        this.isLoading$$.next(true);
        this.coursesService.deleteCourse(id)
            .subscribe({
                next: () => { this.getAll() },
                error: (err) => { this.courses$$.error(err) },
                complete: () => { this.isLoading$$.next(false); }
        });
        
        return this.courses$;
    }

    filterCourses(value: string) {
        // Add your code here
    }

    getAllAuthors() {
        // Add your code here
        this.isLoading$$.next(true);
        this.coursesService.getAllAuthors()
            .subscribe({
                next: (response) => {
                    this.authors$$.next(response);
                },
                error: (err) => { this.authors$$.error(err) },
                complete: () => { this.isLoading$$.next(false); }
        });

        return this.authors$;
    }

    createAuthor(name: string) {
        // Add your code here
        this.isLoading$$.next(true);
        this.coursesService.createAuthor(name)
            .subscribe({
                next: () => { this.getAllAuthors() },
                error: (err) => { this.authors$$.error(err) },
                complete: () => { this.isLoading$$.next(false); }
        });
        
        return this.authors$;
    }

    getAuthorById(id: string) {
        // Add your code here
        this.isLoading$$.next(true);
        this.coursesService.getAuthorById(id)
            .subscribe({
                next: (response) => {
                    this.authors$$.next([response]);
                },
                error: (err) => { this.authors$$.error(err) },
                complete: () => { this.isLoading$$.next(false); }
        });
        
        return this.authors$;
    }
}
