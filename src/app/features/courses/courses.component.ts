import { Component, OnInit } from '@angular/core';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Course } from '@app/services/courses.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  searchPlaceholderText: string = 'Enter your search query';
  createCourseButtonText: string = 'Create Course';
  courses!: Observable<Course[]>;

  constructor(private coursesStoreService: CoursesStoreService) {}

  ngOnInit(): void {
    this.courses = this.coursesStoreService.courses$;
    this.coursesStoreService.getAll();
  }

  searchClick(event?: MouseEvent) {
    console.log('Search button event');
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