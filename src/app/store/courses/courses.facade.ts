import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Course, CoursesState } from './courses.reducer';
import * as CourseSelectors  from './courses.selectors';
import { RequestAllCourses, RequestCreateCourse, RequestDeleteCourse, RequestEditCourse, 
    RequestFilteredCourses, RequestSingleCourse } from './courses.actions';

@Injectable({
    providedIn: 'root'
})
export class CoursesStateFacade {
    // Add your code here
    constructor(private store: Store<CoursesState>) {}

    isAllCoursesLoading$ = this.store.select(CourseSelectors.isAllCoursesLoadingSelector);
    isSingleCourseLoading$ = this.store.select(CourseSelectors.isSingleCourseLoadingSelector);
    isSearchingState$ = this.store.select(CourseSelectors.isSearchingStateSelector);
    courses$ = this.store.select(CourseSelectors.getCourses);
    allCourses$ = this.store.select(CourseSelectors.getAllCourses);
    course$ = this.store.select(CourseSelectors.getCourse);
    errorMessage$ = this.store.select(CourseSelectors.getErrorMessage);

    getAllCourses() { 
        this.store.dispatch(new RequestAllCourses());
    }

    getSingleCourse(id: string | number) {
        this.store.dispatch(new RequestSingleCourse(id));
    }

    getFilteredCourses(searchValue: string) { 
        this.store.dispatch(new RequestFilteredCourses(searchValue));
    }

    editCourse(body: Course, id: string | number) { 
        this.store.dispatch(new RequestEditCourse(id, body));
    }

    createCourse(body: Course) { 
        this.store.dispatch(new RequestCreateCourse(body));
    }

    deleteCourse(id: string | number) {
        this.store.dispatch(new RequestDeleteCourse(id));
    }
}
