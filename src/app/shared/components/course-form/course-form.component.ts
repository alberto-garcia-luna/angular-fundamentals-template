import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,FormArray, FormBuilder, FormControl, 
  FormGroup, ValidationErrors, ValidatorFn, Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Author, Course } from '@app/services/courses.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  courseForm!: FormGroup;

  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
  title!: FormControl;
  description!: FormControl;
  duration!: FormControl;
  author!: FormControl;

  authorsList!: FormArray;
  authors!: FormArray;

  isEdit: boolean = false;

  constructor(public fb: FormBuilder, public library: FaIconLibrary,    
    private coursesStoreService: CoursesStoreService, private router: Router,
    private activatedRoute: ActivatedRoute) {

    library.addIconPacks(fas);
    this.createCourseForm();
  }
  
  submitted: boolean = false;
  addAuthorButtonText: string = 'Create Author';
  addCourseButtonText!: string;
  cancelButtonText: string = 'Cancel';
  deleteButtonIconName: string = 'delete';
  addButtonIconName: string = 'add';

  ngOnInit(): void {
    this.addCourseButtonText = 'Create Course';
    this.getAuthorsList();

    this.activatedRoute.paramMap
      .subscribe(paramMap => {
        let id = paramMap.get('id');
        if (id) {
          this.isEdit = true;
          this.addCourseButtonText = 'Edit Course';
          this.getCourse(id);
        }
      });  
  }

  createCourseForm(){
    this.title = this.fb.control('', Validators.compose([
      Validators.required,
      Validators.minLength(2)
    ]));
    this.description = this.fb.control('', Validators.compose([
      Validators.required,
      Validators.minLength(2)
    ]));
    this.duration = this.fb.control(0, Validators.compose([
      Validators.required,
      Validators.min(1)
    ]));
    this.author = this.fb.control('', Validators.compose([
      Validators.minLength(2),
      forbiddenAuthorName(/^[a-z0-9 ]+$/i)
    ]));

    this.authorsList = this.fb.array([]);
    this.authors = this.fb.array([]);

    this.courseForm = this.fb.group({
      title: this.title,
      description: this.description,
      duration: this.duration,
      author: this.author,
      authors: this.authors,
      newAuthor: this.fb.group({
        author: this.author,
        authors: this.authorsList
      })
    });
  }

  onSubmit(course: Course) {
    this.submitted = true;

    if (!course || this.courseForm.invalid) 
      return;

    console.log(course);

    this.coursesStoreService.createCourse(course)
      .subscribe(() => this.router.navigate(['/courses']));
  }

  getCourse(id: string) {
    this.coursesStoreService.getCourse(id)
      .subscribe((courses) => {
        if (courses.length == 0)
          return;

        this.title.setValue(courses[0].title);
        this.description.setValue(courses[0].description);
        this.duration.setValue(courses[0].duration);
        this.description.setValue(courses[0].description);
        this.authors.clear();
        courses[0].authors.forEach(courseAuthorId => {
          let authorInList = this.authorsList.value.find(
            (item: Author) => item.id === courseAuthorId
          );
          let authorInListIndex = this.authorsList.value.findIndex(
            (item: Author) => item.id === courseAuthorId
          );
          if(authorInList) {
            this.authors.push(this.fb.control({
              id: authorInList.id,
              name: authorInList.name
            }));
            this.authorsList.removeAt(authorInListIndex);
          }
        });
      });
  }

  getAuthorsList() {
    this.coursesStoreService.getAllAuthors()
      .subscribe(response => {
        this.populateAuthorsArray(response);        
      });
  }

  populateAuthorsArray(authorList: Author[]) {
    this.authorsList.clear();
    authorList.forEach(item => {
      this.authorsList.push(this.fb.control({
        id: item.id,
        name: item.name
      }));
    });
  }

  createAuthor(authorName: string) {
    if (!authorName || this.author.invalid)
      return;
    
    this.coursesStoreService.createAuthor(authorName)
      .subscribe(() => {
        this.author.reset();
        this.getAuthorsList();
    
        console.log('Author created: ' + authorName);
      });
  }

  deleteAuthor(authorIndex: number) {
    this.authorsList.removeAt(authorIndex);
    console.log('Author deleted');
  }

  addAuthor(authorItem: Author) {
    if (!authorItem) {
      return;
    }

    let authorIndex = this.authorsList.value.findIndex(
      (item: Author) => item.id === authorItem.id
    );
    if (authorIndex > -1)
    {
      this.authorsList.removeAt(authorIndex);

      this.authors.push(new FormControl({
        id: authorItem.id,
        name: authorItem.name
      }));
    }

    console.log('Author added to course: ' + authorItem.name);
  }

  deleteAuthorFromCourse(authorItem: Author) {
    if (!authorItem) {
      return;
    }

    let authorIndex = this.authors.value.findIndex(
      (item: Author) => item.id === authorItem.id
    );
    if (authorIndex > -1)
    {
      this.authors.removeAt(authorIndex);

      this.authorsList.push(new FormControl({
        id: authorItem.id,
        name: authorItem.name
      }));
    }

    console.log('Author deleted from course: ' + authorItem.name);
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
          ? { authorValidator: { value: control.value } } 
          : null;
    };
}