import { Action, createReducer, on } from '@ngrx/store';
import * as CoursePageActions from './courses.actions';

// Add your code here
export const coursesFeatureKey = 'courses';

export interface CoursesState {
    // Add your code here
    allCourses: Course[] | null;
    course: Course | null;
    isAllCoursesLoading: boolean;
    isSingleCourseLoading: boolean;
    isSearchState: boolean;
    errorMessage: string;
};

export const initialState: CoursesState = {
    // Add your code here
    allCourses: [],
    course: {},
    isAllCoursesLoading: false,
    isSingleCourseLoading: false,
    isSearchState: false,
    errorMessage: ''
};

export interface Course {
  id?: string | number;
  title?: string;
  description?: string;
  creationDate?: string | Date;
  duration?: number;
  authors?: string[];
}

// Add your code here
export const coursesReducer = createReducer(
    initialState,
    on(CoursePageActions.requestAllCourses, (state) => ({ 
      ...state,
      isAllCoursesLoading: true,
      isSingleCourseLoading: false,
      isSearchState: false,
      errorMessage: ''
    })),
    on(CoursePageActions.requestAllCoursesSuccess, (state, { courses }) => ({
      ...state,
      allCourses: courses,
      errorMessage: '',
      isAllCoursesLoading: false,
      isSingleCourseLoading: false,
      isSearchState: false
    })),
    on(CoursePageActions.requestAllCoursesFail, (state, { error }) => ({
      ...state,
      allCourses: [],
      errorMessage: error,
      isAllCoursesLoading: false,
      isSingleCourseLoading: false,
      isSearchState: false
    })),
    on(CoursePageActions.requestSingleCourse, (state) => ({ 
      ...state,
      isAllCoursesLoading: false,
      isSingleCourseLoading: true,
      isSearchState: false,
      errorMessage: ''
    })),
    on(CoursePageActions.requestSingleCourseSuccess, (state, { course }) => ({
      ...state,
      course: course,
      errorMessage: '',
      isAllCoursesLoading: false,
      isSingleCourseLoading: false,
      isSearchState: false
    })),
    on(CoursePageActions.requestSingleCourseFail, (state, { error }) => ({
      ...state,
      course: {},
      errorMessage: error,
      isAllCoursesLoading: false,
      isSingleCourseLoading: false,
      isSearchState: false
    })),
    on(CoursePageActions.requestFilteredCourses, (state) => ({ 
      ...state,
      isAllCoursesLoading: true,
      isSingleCourseLoading: false,
      isSearchState: false,
      errorMessage: ''
    })),
    on(CoursePageActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
      ...state,
      allCourses: courses,
      errorMessage: '',
      isAllCoursesLoading: false,
      isSingleCourseLoading: false,
      isSearchState: false
    })),
    on(CoursePageActions.requestFilteredCoursesFail, (state, { error }) => ({
      ...state,
      allCourses: [],
      errorMessage: error,
      isAllCoursesLoading: false,
      isSingleCourseLoading: false,
      isSearchState: false
    })),
    on(CoursePageActions.requestDeleteCourse, (state) => ({ 
      ...state,
      isAllCoursesLoading: false,
      isSingleCourseLoading: false,
      isSearchState: false,
      errorMessage: ''
    })),
    on(CoursePageActions.requestDeleteCourseSuccess, (state) => ({ 
      ...state,
      errorMessage: '',
      isAllCoursesLoading: false,
      isSingleCourseLoading: false,
      isSearchState: false
    })),
    on(CoursePageActions.requestDeleteCourseFail, (state, { error }) => ({
      ...state,
      errorMessage: error,
      isAllCoursesLoading: false,
      isSingleCourseLoading: false,
      isSearchState: false
    })),
    on(CoursePageActions.requestEditCourse, (state) => ({ 
      ...state,
      isAllCoursesLoading: false,
      isSingleCourseLoading: false,
      isSearchState: false,
      errorMessage: ''
    })),
    on(CoursePageActions.requestEditCourseSuccess, (state, { course }) => ({
      ...state,
      course: course,
      errorMessage: '',
      isAllCoursesLoading: false,
      isSingleCourseLoading: false,
      isSearchState: false
    })),
    on(CoursePageActions.requestEditCourseFail, (state, { error }) => ({
      ...state,
      course: {},
      errorMessage: error,
      isAllCoursesLoading: false,
      isSingleCourseLoading: false,
      isSearchState: false
    })),
    on(CoursePageActions.requestCreateCourse, (state) => ({ 
      ...state,
      isAllCoursesLoading: false,
      isSingleCourseLoading: false,
      isSearchState: false,
      errorMessage: ''
    })),
    on(CoursePageActions.requestCreateCourseSuccess, (state, { course }) => ({
      ...state,
      course: course,
      errorMessage: '',
      isAllCoursesLoading: false,
      isSingleCourseLoading: false,
      isSearchState: false
    })),
    on(CoursePageActions.requestCreateCourseFail, (state, { error }) => ({
      ...state,
      course: {},
      errorMessage: error,
      isAllCoursesLoading: false,
      isSingleCourseLoading: false,
      isSearchState: false
    }))
);

export const reducer = (state: CoursesState, action: Action): CoursesState => coursesReducer(state, action);
