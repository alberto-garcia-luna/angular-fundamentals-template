import { Component } from '@angular/core';
import { mockedCoursesList } from '@app/shared/mocks/mock';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  searchPlaceholderText: string = 'Enter your search query';
  createCourseButtonText: string = 'Create Course';
  testCourses = mockedCoursesList;

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
