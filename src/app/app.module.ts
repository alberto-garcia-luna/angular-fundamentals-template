import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AppComponent } from '@app/app.component';
import { CourseListComponent } from './features/courses/course-list/course-list.component';
import { CourseInfoComponent } from '@features/course-info/course-info.component';
import { CoursesComponent } from './features/courses/courses.component';
import { NotAuthorizedGuard } from '@app/auth/guards/not-authorized.guard';
import { AuthorizedGuard } from '@app/auth/guards/authorized.guard';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { CoursesService } from '@app/services/courses.service';

@NgModule({
  declarations: [
    AppComponent, 
    CourseInfoComponent, 
    CourseListComponent, 
    CoursesComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [RouterModule],
  providers: [
    AuthorizedGuard, 
    NotAuthorizedGuard, 
    CoursesService, 
    CoursesStoreService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
