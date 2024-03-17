import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators
} from '@angular/forms';
import { mockedAuthorsList } from '@app/shared/mocks/mock';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

export class Author {
  id: string = '';
  name: string = '';
}

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  courseForm!: FormGroup;
  newAuthor!: FormGroup;

  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
  title: FormControl;
  description: FormControl;
  duration: FormControl;
  author: FormControl;

  authors: FormArray;
  courseAuthors: FormArray;

  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);

    this.title = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2)
    ]));
    this.description = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2)
    ]));
    this.duration = new FormControl(0, Validators.compose([
      Validators.required,
      Validators.min(0)
    ]));
    this.author = new FormControl('', Validators.compose([
      Validators.minLength(2),
      forbiddenAuthorName(/^[a-z0-9 ]+$/i)
    ]));

    this.authors = fb.array([]);
    this.courseAuthors = fb.array([]);

    this.courseForm = fb.group({
      title: this.title,
      description: this.description,
      duration: this.duration,
      authors: this.courseAuthors
    });

    this.newAuthor = new FormGroup({
      author: this.author,
      authors: this.authors
    });
  }
  
  submitted: boolean = false;
  addAuthorButtonText: string = 'Create Author';
  addCourseButtonText: string = 'Create Course';
  cancelButtonText: string = 'Cancel';
  deleteButtonIconName: string = 'delete';
  addButtonIconName: string = 'add';

  ngOnInit(): void {
    let authorList = this.getAuthors();
    authorList.forEach(item => {
      this.authors.push(new FormControl({
        id: item.id,
        name: item.name
      }));
    });
  }

  getAuthors(): Author[] {
    return mockedAuthorsList;
  }

  onSubmit(courseItem: any) {
    this.submitted = true;
    console.log(courseItem);
  }

  createAuthor(authorName: string) {
    if (!authorName || this.author.invalid) {
      return;
    }
    
    this.authors.push(new FormControl({
      id: crypto.randomUUID(),
      name: authorName
    }));
    this.author.reset();

    console.log('Author created: ' + authorName);
  }

  deleteAuthor(authorIndex: number) {
    this.authors.removeAt(authorIndex);
    console.log('Author deleted');
  }

  addAuthor(authorItem: Author) {
    if (!authorItem) {
      return;
    }

    let authorIndex = this.authors.value.findIndex(
      (item: { id: string; }) => item.id === authorItem.id
    );
    if (authorIndex > -1)
    {
      this.authors.removeAt(authorIndex);

      this.courseAuthors.push(new FormControl({
        id: authorItem.id,
        name: authorItem.name
      }));

      console.log('Author added to course: ' + authorItem.name);
    }    
  }

  deleteAuthorFromCourse(authorItem: Author) {
    if (!authorItem) {
      return;
    }

    let authorIndex = this.courseAuthors.value.findIndex(
      (item: { id: string; }) => item.id === authorItem.id
    );
    if (authorIndex > -1)
    {
      this.courseAuthors.removeAt(authorIndex);

      this.authors.push(new FormControl({
        id: authorItem.id,
        name: authorItem.name
      }));

      console.log('Author deleted from course: ' + authorItem.name);
    }
  }

  onCancel() {
    console.log("Cancel button");
  }
}
export function forbiddenAuthorName(regExp: RegExp): ValidatorFn  {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const validAuthor = regExp.test(control.value);
      return !validAuthor 
          ? {authorValidator: { value: control.value }} 
          : null;
    };
}