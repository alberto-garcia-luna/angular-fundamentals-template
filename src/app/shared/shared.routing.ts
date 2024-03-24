import { Routes, RouterModule } from "@angular/router";
import { CourseFormComponent, LoginFormComponent, RegistrationFormComponent } from "./components";

const routes: Routes = [
    { path: 'login', component: LoginFormComponent },
    { path: 'registration', component: RegistrationFormComponent },
    { path: 'courses/add', component: CourseFormComponent },
    { path: 'courses/edit/:id', component: CourseFormComponent },
];

export const sharedRouting = RouterModule.forChild(routes);