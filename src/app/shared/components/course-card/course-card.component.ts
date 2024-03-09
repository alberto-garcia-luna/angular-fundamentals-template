import { Component, EventEmitter, Input, Output } from '@angular/core';
import { formatDate } from '@angular/common';
import { mockedAuthorsList } from '@app/shared/mocks/mock';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() editable: boolean = false;
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() creationDate: string = '';
  @Input() duration: number = 0;
  @Input() authors: string[] = [];

  @Output() clickOnShow = new EventEmitter();

  iconName: string = 'trash';
  creationDateFormatted: string = '';
  durationFormatted: string = ''
  showCourseButtonText: string = "Show Course";

  ngOnInit() {
    this.creationDateFormatted = 
      this.getFormattedDate(new Date(this.creationDate), 'dd.MM.yyyy');

    this.durationFormatted = this.getFormattedHours(this.duration);
  }

  showCourseButtonClick() {
    this.clickOnShow.emit();
  }

  getFormattedDate(date: Date, format?: string): string {
    if(!format){
      format = 'yyyy/MM/dd'
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