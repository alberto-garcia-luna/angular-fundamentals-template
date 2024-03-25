import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course, CoursesService } from '@app/services/courses.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {
  // Use the names for the input `course`.
  @Input() course!: Course;

  backCourseButtonText: string = "Back";

  constructor(private coursesService: CoursesService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    if(!this.course) {
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
      });
  }

  getAuthorsName(authorId: string): string {
    let authorName = '';
    this.coursesService.getAuthorById(authorId)
      .subscribe(response => {
        authorName = response.name;
      });

    return authorName;
  }

  backCourseClick(event?: MouseEvent) {
    console.log('Back Course button event');
  }
}
