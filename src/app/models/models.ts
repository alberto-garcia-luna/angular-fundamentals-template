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

export interface UserResponse {
    successful: boolean;
    result: User;
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