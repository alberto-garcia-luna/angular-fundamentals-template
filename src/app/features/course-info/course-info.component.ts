import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '@app/services/courses.service';
import { Course } from '@app/store/courses/courses.reducer';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {
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
  authorsNames: string[] = [];

  constructor(private coursesService: CoursesService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    if(!this.course.id) {
      this.activatedRoute.paramMap
        .subscribe(paramMap => {
          let id = paramMap.get('id');
          if (id) {
            this.getCourse(id);
          }
        });
    }
  }

  getCourse(id: string) {
    this.coursesService.getCourse(id)
      .subscribe(response => {
        this.course = response;
        this.getAuthorsName(response.authors);
      });
  }

  getAuthorsName(authorsIds: string[] | undefined) {
    authorsIds?.forEach(authorId => {
      this.coursesService.getAuthorById(authorId)
        .subscribe(response => {
          this.authorsNames.push(response.name);
        });
    });
  }

  backCourseClick(event?: MouseEvent) {
    console.log('Back Course button event');
  }
}
