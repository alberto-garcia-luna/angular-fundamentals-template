import { Component, OnInit } from '@angular/core';
import {
  FormArray, FormBuilder, FormControl, FormGroup, Validators
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
  courseForm!: FormGroup;
  submitted: boolean = false;
  addAuthorButtonText: string = 'Create Author';
  addCourseButtonText: string = 'Create Course';
  cancelButtonText: string = 'Cancel';
  deleteButtonIconName: string = 'delete';
  
  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
  title: FormControl = new FormControl('', Validators.compose([
    Validators.required,
    Validators.minLength(2)
  ]));
  description: FormControl = new FormControl('', Validators.compose([
    Validators.required,
    Validators.minLength(2)
  ]));
  duration: FormControl = new FormControl(0, Validators.compose([
    Validators.required,
    Validators.min(0)
  ]));

  author: FormControl = new FormControl('', Validators.compose([
    Validators.minLength(2)
  ]));
  authors: FormArray = new FormArray<FormControl>([]);

  ngOnInit(): void {
    this.courseForm = new FormGroup({
      title: this.title,
      description: this.description,
      duration: this.duration,
      authors: this.authors
    });
  }

  onSubmit(courseItem: any) {
    this.submitted = true;
    console.log(courseItem);
  }

  addAuthor(authorName: string) {
    if (!authorName || this.author.invalid) {
      return;
    }

    console.log(authorName);
    this.authors.push(new FormControl(authorName));
    this.author.reset();
  }

  deleteAuthor(authorIndex: number) {
    this.authors.removeAt(authorIndex);
  }

  onCancel() {
    console.log("Cancel button");
  }
}
