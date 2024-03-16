import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() editable: boolean = false;
  @Input() course: Course = {
    id: '',
    title: '',
    description: '',
    creationDate: '',
    duration: 0,
    authors: []
  };

  @Output() clickOnShow = new EventEmitter();

  iconName: string = 'trash';
  showCourseButtonText: string = "Show Course";

  showCourseButtonClick() {
    this.clickOnShow.emit();
  }

  getAuthorsName(authorId: string): string {
    let author = mockedAuthorsList.find((author) =>
      author.id === authorId
    );

    return author ? author.name : 'Not found';
  }
}