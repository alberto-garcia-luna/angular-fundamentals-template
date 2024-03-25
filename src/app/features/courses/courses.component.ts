import { Component, OnInit } from '@angular/core';
import { Course, CoursesService } from '@app/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  searchPlaceholderText: string = 'Enter your search query';
  createCourseButtonText: string = 'Create Course';
  courses!: Course[];

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses() {
    this.coursesService.getAll()
      .subscribe(response => {
        this.courses = response;
      });
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
    this.getAllCourses();
  }
}
