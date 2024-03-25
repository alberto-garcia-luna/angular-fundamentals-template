import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Course, CoursesService } from '@app/services/courses.service';

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

  constructor(private coursesService: CoursesService,
    private router: Router) {}

  showCourseButtonClick(id: string) {
    this.showCourse.emit();
    this.router.navigate([`courses/${id}`]);
  }
  
  editCourseButtonClick(id: string) {    
    this.editCourse.emit();
    this.router.navigate([`courses/edit/${id}`]);
  }
  
  deleteCourseButtonClick(id: string) {
    this.coursesService.deleteCourse(id)
      .subscribe(() => {
        this.deleteCourse.emit();
      });
  }  
}
