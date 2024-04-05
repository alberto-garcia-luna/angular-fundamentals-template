import { Action, createAction, props } from '@ngrx/store';
import { CoursesConstants } from '@app/store/courses/courses.constants';
import { Course } from './courses.reducer';

// Add your code here
export const requestAllCourses = createAction(CoursesConstants.REQUEST_ALL_COURSES);
export const requestAllCoursesSuccess = createAction(CoursesConstants.REQUEST_ALL_COURSES_SUCCESS, props<{ courses: Course[] }>());
export const requestAllCoursesFail = createAction(CoursesConstants.REQUEST_ALL_COURSES_FAIL, props<{ error: string }>());

export const requestSingleCourse = createAction(CoursesConstants.REQUEST_SINGLE_COURSE, props<{ id: string | number }>());
export const requestSingleCourseSuccess = createAction(CoursesConstants.REQUEST_SINGLE_COURSE_SUCCESS, props<{ course: Course }>());
export const requestSingleCourseFail = createAction(CoursesConstants.REQUEST_SINGLE_COURSE_FAIL, props<{ error: string }>());

export const requestFilteredCourses = createAction(CoursesConstants.REQUEST_FILTERED_COURSES, props<{ title: string }>());
export const requestFilteredCoursesSuccess = createAction(CoursesConstants.REQUEST_FILTERED_COURSES_SUCCESS, props<{ courses: Course[] }>());
export const requestFilteredCoursesFail = createAction(CoursesConstants.REQUEST_FILTERED_COURSES_FAIL, props<{ error: string }>());

export const requestDeleteCourse = createAction(CoursesConstants.REQUEST_DELETE_COURSE, props<{ id: string | number }>());
export const requestDeleteCourseSuccess = createAction(CoursesConstants.REQUEST_DELETE_COURSE_SUCCESS, props<{ id: string | number }>());
export const requestDeleteCourseFail = createAction(CoursesConstants.REQUEST_DELETE_COURSE_FAIL, props<{ error: string }>());

export const requestEditCourse = createAction(CoursesConstants.REQUEST_EDIT_COURSE, props<{ id: string | number, course: Course }>());
export const requestEditCourseSuccess = createAction(CoursesConstants.REQUEST_EDIT_COURSE_SUCCESS, props<{ course: Course }>());
export const requestEditCourseFail = createAction(CoursesConstants.REQUEST_EDIT_COURSE_FAIL, props<{ error: string }>());

export const requestCreateCourse = createAction(CoursesConstants.REQUEST_CREATE_COURSE, props<{ course: Course }>());
export const requestCreateCourseSuccess = createAction(CoursesConstants.REQUEST_CREATE_COURSE_SUCCESS, props<{ course: Course }>());
export const requestCreateCourseFail = createAction(CoursesConstants.REQUEST_CREATE_COURSE_FAIL, props<{ error: string }>());

export class RequestAllCourses implements Action {
    readonly type = CoursesConstants.REQUEST_ALL_COURSES;
}

export class RequestSingleCourse implements Action {
    readonly type = CoursesConstants.REQUEST_SINGLE_COURSE;
    readonly id: string | number;

    constructor(id: string | number) {
        this.id = id;
    }
}

export class RequestFilteredCourses implements Action {
    readonly type = CoursesConstants.REQUEST_FILTERED_COURSES;
    readonly title: string;

    constructor(searchValue: string) {
        this.title = searchValue;
    }
}

export class RequestEditCourse implements Action {
    readonly type = CoursesConstants.REQUEST_EDIT_COURSE;
    readonly id: string | number;
    readonly course: Course;

    constructor(id: string | number, body: Course) {
        this.id = id;
        this.course = body;
    }
}

export class RequestCreateCourse implements Action {
    readonly type = CoursesConstants.REQUEST_CREATE_COURSE;
    readonly course: Course;

    constructor(body: Course) {
        this.course = body;
    }
}

export class RequestDeleteCourse implements Action {
    readonly type = CoursesConstants.REQUEST_DELETE_COURSE;
    readonly id: string | number;

    constructor(id: string | number) {
        this.id = id;
    }
}