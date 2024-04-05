import { Injectable } from '@angular/core';
import { CoursesService } from '@app/services/courses.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import * as CoursePageActions from './courses.actions';
import { Router } from '@angular/router';

@Injectable()
export class CoursesEffects {
    constructor(private actions$: Actions,
        private coursesService: CoursesService,
        private router: Router) {}

    // Add your code here
    getAll$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursePageActions.requestAllCourses),
            mergeMap(() => this.coursesService.getAll()
                .pipe(
                    map(courses => (CoursePageActions.requestAllCoursesSuccess({courses: courses}))),
                    catchError(error => of(CoursePageActions.requestAllCoursesFail(error)))
                )
            )
        )
    );

    getSpecificCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursePageActions.requestSingleCourse),
            mergeMap(action => this.coursesService.getCourse(action.id)
                .pipe(
                    map(course => (CoursePageActions.requestSingleCourseSuccess({course: course}))),
                    catchError(error => of(CoursePageActions.requestSingleCourseFail(error)))
                )
            )
        )
    );

    deleteCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursePageActions.requestDeleteCourse),
            mergeMap(action => this.coursesService.deleteCourse(action.id)
                .pipe(
                    map(() => (CoursePageActions.requestDeleteCourseSuccess)),
                    catchError(error => of(CoursePageActions.requestDeleteCourseFail(error)))
                )
            )
        )
    );

    editCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursePageActions.requestEditCourse),
            mergeMap(action => this.coursesService.editCourse(action.id, action.course)
                .pipe(
                    map(course => (CoursePageActions.requestEditCourseSuccess({course: course}))),
                    catchError(error => of(CoursePageActions.requestEditCourseFail(error)))
                )
            )
        ),
        { dispatch: false }
    );

    createCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursePageActions.requestCreateCourse),
            mergeMap(action => this.coursesService.createCourse(action.course)
                .pipe(
                    map(course => (CoursePageActions.requestCreateCourseSuccess({course: course}))),
                    catchError(error => of(CoursePageActions.requestCreateCourseFail(error)))
                )
            )
        )
    );

    filteredCourses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursePageActions.requestFilteredCourses),
            mergeMap(action => this.coursesService.filterCourses(action.title)
                .pipe(
                    map(courses => (CoursePageActions.requestFilteredCoursesSuccess({courses: courses}))),
                    catchError(error => of(CoursePageActions.requestFilteredCoursesFail(error)))
                )
            )
        )
    );

    redirectToTheCoursesPage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursePageActions.requestCreateCourseSuccess, 
                CoursePageActions.requestEditCourseSuccess,
                CoursePageActions.requestSingleCourseFail),
            tap(() => this.router.navigate(['/courses']))
        )
    );
}
