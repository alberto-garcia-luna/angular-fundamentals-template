import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

const CoursesApiUrl: string = 'http://localhost:4000/Courses';
const AuthorsApiUrl: string = 'http://localhost:4000/Authors';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    constructor(private http: HttpClient) {}

    getAll() {
        return this.http.get<CoursesResponse>(`${CoursesApiUrl}/all`)
            .pipe(map(response => { 
                return response.result; 
            }));
    }

    createCourse(course: Course) { // replace 'any' with the required interface
        // Add your code here
        return this.http.post(`${CoursesApiUrl}/add`, course);
    }

    editCourse(id: string, course: Course) { // replace 'any' with the required interface
        // Add your code here
        return this.http.put(`${CoursesApiUrl}/${id}`, course);
    }

    getCourse(id: string) {
        // Add your code here
        return this.http.get<CourseResponse>(`${CoursesApiUrl}/${id}`)
            .pipe(map(response => { return response.result; }));
    }

    deleteCourse(id: string) {
        return this.http.delete(`${CoursesApiUrl}/${id}`);
    }

    filterCourses(value?: string) {
        let getOptions = {};
        if (value) {
            getOptions = {
                name: { title: value }
            }
        }

        return this.http.get<CoursesResponse>(`${CoursesApiUrl}/filter`, getOptions)
            .pipe(map(response => { return response.result; }));
    }

    getAllAuthors() {
        // Add your code here
        return this.http.get<AuthorsResponse>(`${AuthorsApiUrl}/all`)
            .pipe(map(response => { return response.result; }));
    }

    createAuthor(authorName: string) {
        // Add your code here
        return this.http.post(`${AuthorsApiUrl}/add`, {});
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

export interface CoursesResponse {
    successful: boolean;
    result: Course[];
}

export interface CourseResponse {
    successful: boolean;
    result: Course;
}

export interface Course {
    id: string;
    title: string;
    description: string;
    creationDate: string | Date;
    duration: number;
    authors: string[];
}

export interface AuthorsResponse {
    successful: boolean;
    result: Author[];
}

export interface AuthorResponse {
    successful: boolean;
    result: Author;
}

export interface Author {
    id: string;
    name: string;
}