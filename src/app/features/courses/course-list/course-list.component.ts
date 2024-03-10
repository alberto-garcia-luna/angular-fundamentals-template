import { Component, EventEmitter, Input, Output } from '@angular/core';
export class Course {
  id: string = '';
  title: string = '';
  description: string = '';
  creationDate: string | Date = '';
  duration: number = 0;
  authors: string[] = [];
}

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent {
  @Input() courses: Course[] = [];
  @Input() editable: boolean = false;

  @Output() showCourse = new EventEmitter();
  @Output() editCourse = new EventEmitter();
  @Output() deleteCourse = new EventEmitter();

  showCourseButtonText: string = "Show Course";
  editButtonName: string = 'edit';
  deleteButtonName: string = 'delete';

  showCourseButtonClick() {
    this.showCourse.emit();
  }
  
  editCourseButtonClick() {
    this.editCourse.emit();
  }
  
  deleteCourseButtonClick() {
    this.deleteCourse.emit();
  }  
}
