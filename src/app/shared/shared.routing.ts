import { Routes, RouterModule } from "@angular/router";
import { CourseFormComponent, LoginFormComponent, RegistrationFormComponent } from "./components";
import { NotAuthorizedGuard } from "@app/auth/guards/not-authorized.guard";
import { AuthorizedGuard } from "@app/auth/guards/authorized.guard";

const routes: Routes = [
    { 
        path: 'login', 
        component: LoginFormComponent, 
        canActivate: [NotAuthorizedGuard] 
    },
    { 
        path: 'registration', 
        component: RegistrationFormComponent, 
        canActivate: [NotAuthorizedGuard] 
    },
    { 
        path: 'courses/add', 
        component: CourseFormComponent,
        canActivate: [AuthorizedGuard]  
    },
    { 
        path: 'courses/edit/:id', 
        component: CourseFormComponent,
        canActivate: [AuthorizedGuard]  
    }
];

export const sharedRouting = RouterModule.forChild(routes);