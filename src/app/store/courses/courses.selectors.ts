import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoursesState, coursesFeatureKey } from "./courses.reducer";
// Add your code here

export const getCourseState = createFeatureSelector<CoursesState>(coursesFeatureKey);

export const isAllCoursesLoadingSelector = createSelector(
    getCourseState,
    (state: CoursesState) => state.isAllCoursesLoading
);

export const isSearchingStateSelector = createSelector(
    getCourseState,
    (state: CoursesState) => state.isSearchState
);

export const isSingleCourseLoadingSelector = createSelector(
    getCourseState,
    (state: CoursesState) => state.isSingleCourseLoading
);

export const getAllCourses = createSelector(
    getCourseState,
    (state: CoursesState) => state.allCourses
);

export const getCourses = createSelector(
    getCourseState,
    (state: CoursesState) => state.courses
);

export const getCourse = createSelector(
    getCourseState,
    (state: CoursesState) => state.course
);

export const getErrorMessage = createSelector(
    getCourseState,
    (state: CoursesState) => state.errorMessage
);