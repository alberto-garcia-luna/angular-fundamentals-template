import { Routes, RouterModule } from "@angular/router";
import { CoursesComponent } from "./courses.component";
import { CourseInfoComponent } from "../course-info/course-info.component";
import { AuthorizedGuard } from "@app/auth/guards/authorized.guard";

const routes: Routes = [
    { 
        path: 'courses', 
        component: CoursesComponent, 
        canActivate: [AuthorizedGuard] 
    },
    { 
        path: 'courses/:id', 
        component: CourseInfoComponent, 
        canActivate: [AuthorizedGuard] 
    },
    { 
        path: '', 
        component: CoursesComponent, 
        pathMatch: 'full', 
        canActivate: [AuthorizedGuard] 
    }
];

export const coursesRouting = RouterModule.forChild(routes);