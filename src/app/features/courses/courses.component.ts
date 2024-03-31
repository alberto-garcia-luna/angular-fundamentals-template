import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { Course } from '@app/models/models';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  searchPlaceholderText: string = 'Enter your search query';
  createCourseButtonText: string = 'Create Course';
  infoTitle: string = 'Your List Is Empty';
  infoText: string = 'Please use \'Add New Course\' button to add your first course';
  infoButtonText: string = 'Add New Course';

  courses!: Observable<Course[]>;
  isEditable!: Observable<boolean>;

  constructor(private coursesStoreService: CoursesStoreService,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    this.courses = this.coursesStoreService.courses$;
    this.isEditable = this.authService.isAdmin$;
    this.coursesStoreService.getAll();
  }

  searchClick(event?: MouseEvent) {
    console.log('Search button event');
  }

  addNewCourseClick(event?: MouseEvent) {
    console.log('Add New button event');
    this.router.navigate(['/courses/add']);
  }

  showCourseClick(event?: MouseEvent) {
    console.log('Show Course button event');
  }

  editCourseClick(event?: MouseEvent) {
    console.log('Edit Course button event');
  }

  deleteCourseClick(event?: MouseEvent) {
    console.log('Delete Course button event');
  }
}