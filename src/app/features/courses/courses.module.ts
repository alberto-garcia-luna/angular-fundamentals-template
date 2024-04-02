import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CourseInfoComponent } from '../course-info/course-info.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CoursesComponent } from './courses.component';
import { coursesRouting } from './courses.routing';
import { SharedModule } from '@app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import * as fromCourseReducer from '@app/store/courses/courses.reducer';

const components = [
    CoursesComponent,
    CourseInfoComponent,
    CourseListComponent,
]

@NgModule({
    declarations: [components],
    imports: [
        CommonModule,
        SharedModule,
        coursesRouting,
        StoreModule.forFeature(
            fromCourseReducer.coursesFeatureKey,
            fromCourseReducer.reducer
        )
    ],    
    exports: [components]
})
export class CoursesModule {}