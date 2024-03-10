import { Component, EventEmitter, Input, Output } from '@angular/core';
import { formatDate } from '@angular/common';
import { mockedAuthorsList } from '@app/shared/mocks/mock';
export class Course {
  id: string = '';
  title: string = '';
  description: string = '';
  creationDate: string = '';
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

  getFormattedDate(date: string, format?: string): string {
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
}