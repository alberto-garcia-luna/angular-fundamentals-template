import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { AuthorResponse, AuthorsResponse, CourseResponse, CoursesResponse } from '@app/models/models';
import { Course } from '@app/store/courses/courses.reducer';

const CoursesApiUrl: string = 'http://localhost:4000/Courses';
const AuthorsApiUrl: string = 'http://localhost:4000/Authors';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    constructor(private http: HttpClient) {}

    getAll() {
        return this.http.get<CoursesResponse>(`${CoursesApiUrl}/all`)
            .pipe(map(response => response.result ));
    }

    createCourse(course: Course) { // replace 'any' with the required interface
        // Add your code here
        return this.http.post<CourseResponse>(`${CoursesApiUrl}/add`, course)
            .pipe(map(response => response.result ));   
    }

    editCourse(id: string | number, course: Course) { // replace 'any' with the required interface
        // Add your code here
        return this.http.put<CourseResponse>(`${CoursesApiUrl}/${id}`, course)
            .pipe(map(response => response.result ));
    }

    getCourse(id: string | number) {
        // Add your code here
        return this.http.get<CourseResponse>(`${CoursesApiUrl}/${id}`)
            .pipe(map(response => response.result ));
    }

    deleteCourse(id: string | number) {
        return this.http.delete(`${CoursesApiUrl}/${id}`);
    }

    filterCourses(value?: string) {
        return this.http.get<CoursesResponse>(`${CoursesApiUrl}/filter?title=${value}`)
            .pipe(map(response => { return response.result; }));
    }

    getAllAuthors() {
        // Add your code here
        return this.http.get<AuthorsResponse>(`${AuthorsApiUrl}/all`)
            .pipe(map(response => { return response.result; }));
    }

    createAuthor(authorName: string) {
        // Add your code here
        return this.http.post(`${AuthorsApiUrl}/add`, { name: authorName });
    }

    getAuthorById(id: string) {
        // Add your code here
        return this.http.get<AuthorResponse>(`${AuthorsApiUrl}/${id}`)
            .pipe(map(response => { return response.result; }));
    }

    deleteAuthor(id: string) {
        return this.http.delete(`${AuthorsApiUrl}/${id}`);
    }
}