import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '@app/models/models';
import { CoursesStoreService } from '@app/services/courses-store.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent {
  @Input() courses: Course[] | null = [];
  @Input() editable: boolean = false;

  @Output() showCourse = new EventEmitter();
  @Output() editCourse = new EventEmitter();
  @Output() deleteCourse = new EventEmitter();

  showCourseButtonText: string = "Show Course";
  editButtonName: string = 'edit';
  deleteButtonName: string = 'delete';

  constructor(private router: Router,
    private coursesStoreService: CoursesStoreService) {}

  showCourseButtonClick(id: string) {
    this.showCourse.emit();
    this.router.navigate([`courses/${id}`]);
  }
  
  editCourseButtonClick(id: string) {
    this.editCourse.emit();
    this.router.navigate([`courses/edit/${id}`]);
  }
  
  deleteCourseButtonClick(id: string) {
    this.coursesStoreService.deleteCourse(id)
      .subscribe(() => this.deleteCourse.emit());
  }  
}
