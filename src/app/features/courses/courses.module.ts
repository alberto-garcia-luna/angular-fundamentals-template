import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CourseInfoComponent } from '../course-info/course-info.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CoursesComponent } from './courses.component';
import { coursesRouting } from './courses.routing';
import { SharedModule } from '@app/shared/shared.module';

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
        coursesRouting
    ],    
    exports: [components]
})
export class CoursesModule {}