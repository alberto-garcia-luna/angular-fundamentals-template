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

  getFormattedDate(date: string | Date, format?: string): string {
    if(!format){
      format = 'dd.MM.yyyy'
    }

    return formatDate(date, format, 'en-US');
  }

  getFormattedHours(totalMinutes: number): string {
    const hours: number = Math.floor(totalMinutes / 60);
    const minutes: number = totalMinutes % 60;

    return hours + ":" + minutes.toLocaleString('en-US', {minimumIntegerDigits: 2}) + " hours";
  }

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
