import { formatDate } from '@angular/common';
import { Component, Input } from '@angular/core';
import { mockedAuthorsList } from '@app/shared/mocks/mock';
export class Course {
  id: string = '';
  title: string = '';
  description: string = '';
  creationDate: string | Date = '';
  duration: number = 0;
  authors: string[] = [];
}

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  // Use the names for the input `course`.
  @Input() course: Course = {
    id: '',
    title: '',
    description: '',
    creationDate: '',
    duration: 0,
    authors: []
  };

  backCourseButtonText: string = "Back";

  getAuthorsName(authorId: string): string {
    let author = mockedAuthorsList.find((author) =>
      author.id === authorId
    );

    return author ? author.name : 'Not found';
  }

  backCourseClick(event?: MouseEvent) {
    console.log('Back Course button event');
  }
}
