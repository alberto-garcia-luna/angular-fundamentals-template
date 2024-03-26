import { Routes, RouterModule } from "@angular/router";
import { CourseFormComponent, LoginFormComponent, RegistrationFormComponent } from "./components";
import { AuthorizedGuard } from "@app/auth/guards/authorized.guard";

const routes: Routes = [
    { path: 'login', component: LoginFormComponent },
    { path: 'registration', component: RegistrationFormComponent },
    { 
        path: 'courses/add', 
        component: CourseFormComponent,
        canActivate: [AuthorizedGuard]
    },
    { 
        path: 'courses/edit/:id', 
        component: CourseFormComponent,
        canActivate: [AuthorizedGuard] 
    },
];

export const sharedRouting = RouterModule.forChild(routes);