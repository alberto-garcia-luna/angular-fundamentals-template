import { Action, createReducer, on } from '@ngrx/store';
import * as CoursePageActions from './courses.actions';
import { Course } from '@app/models/models';

// Add your code here
export const coursesFeatureKey = 'courses';

export interface CoursesState {
    // Add your code here
    allCourses: Course[];
    courses: Course[];
    course: Course;
    isAllCoursesLoading: boolean;
    isSingleCourseLoading: boolean;
    isSearchState: boolean;
    errorMessage: string;
};

export const initialState: CoursesState = {
    // Add your code here
    allCourses: [],
    courses: [],
    course: {
        id: '',
        title: '',
        creationDate: '',
        description: '',
        duration: 0,
        authors: []
    },
    isAllCoursesLoading: false,
    isSingleCourseLoading: false,
    isSearchState: false,
    errorMessage: ''
};

// Add your code here
export const coursesReducer = createReducer(
    initialState,
    on(CoursePageActions.requestAllCourses, (state) => ({ ...state })),
    on(CoursePageActions.requestAllCoursesSuccess, (state, { courses }) => ({
      ...state,
      courses: courses
    })),
    on(CoursePageActions.requestAllCoursesFail, (state, { error }) => ({
        ...state,
        error: error
      })),
    on(CoursePageActions.requestSingleCourse, (state) => ({ ...state })),
    on(CoursePageActions.requestSingleCourseSuccess, (state, { course }) => ({
      ...state,
      course: course
    })),
    on(CoursePageActions.requestSingleCourseFail, (state, { error }) => ({
        ...state,
        error: error
      })),
    on(CoursePageActions.requestFilteredCourses, (state) => ({ ...state })),
    on(CoursePageActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
      ...state,
      courses: courses
    })),
    on(CoursePageActions.requestFilteredCoursesFail, (state, { error }) => ({
        ...state,
        error: error
      })),
    on(CoursePageActions.requestDeleteCourse, (state) => ({ ...state })),
    on(CoursePageActions.requestDeleteCourseSuccess, (state) => ({ ...state })),
    on(CoursePageActions.requestDeleteCourseFail, (state, { error }) => ({
        ...state,
        error: error
      })),
    on(CoursePageActions.requestEditCourse, (state) => ({ ...state })),
    on(CoursePageActions.requestEditCourseSuccess, (state, { course }) => ({
        ...state,
        course: course
      })),
    on(CoursePageActions.requestEditCourseFail, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(CoursePageActions.requestCreateCourse, (state) => ({ ...state })),
    on(CoursePageActions.requestCreateCourseSuccess, (state, { course }) => ({
        ...state,
        course: course
      })),
    on(CoursePageActions.requestCreateCourseFail, (state, { error }) => ({
        ...state,
        error: error
    }))
);

export const reducer = (state: CoursesState, action: Action): CoursesState => coursesReducer(state, action);
