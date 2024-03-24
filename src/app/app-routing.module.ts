import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    /* Add your code here */
    {
        path: 'courses', 
        loadChildren: () => import('./features/courses/courses.module').then(module => module.CoursesModule) 
    },
    { path: '', redirectTo: 'courses', pathMatch: 'full' },
    { path: '**', redirectTo: 'courses'}
];

export const routing = RouterModule.forRoot(routes);