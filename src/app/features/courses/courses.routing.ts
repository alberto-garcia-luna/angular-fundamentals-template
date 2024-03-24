import { Routes, RouterModule } from "@angular/router";
import { CoursesComponent } from "./courses.component";
import { CourseInfoComponent } from "../course-info/course-info.component";

const routes: Routes = [    
    { path: 'courses/:id', component: CourseInfoComponent },
    { path: '', component: CoursesComponent, pathMatch: 'full' }
];

export const coursesRouting = RouterModule.forChild(routes);