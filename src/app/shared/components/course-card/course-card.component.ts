import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from '@app/models/models';
import { CoursesService } from '@app/services/courses.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {
  @Input() editable: boolean = false;
  @Input() course!: Course;

  @Output() clickOnShow = new EventEmitter();

  iconName: string = 'trash';
  showCourseButtonText: string = "Show Course";
  authorsNames: string[] = [];

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.course.authors.forEach(authorId => {
      this.coursesService.getAuthorById(authorId)
        .subscribe(response => {
          this.authorsNames.push(response.name);
        });
    });
  }

  showCourseButtonClick() {
    this.clickOnShow.emit();
  }
}