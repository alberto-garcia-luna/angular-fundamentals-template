import { Component } from '@angular/core';

export class User {
  username: string;
  hasSession: boolean;

  constructor(username?: string, hasSession?: boolean){
    this.username = username || '';
    this.hasSession = hasSession || false;
  }
}

export class Course {
  title: string;
  description: string;
  creationDate: Date;
  duration: number;
  authors: string[];
  editable: boolean;

  constructor(title?: string, description?: string, creationDate?: Date, 
    duration?: number, authors?: string[], editable?: boolean) {

    this.title = title || '';
    this.description = description || '';
    this.creationDate = creationDate || new Date();
    this.duration = duration || 0;
    this.authors = authors || [];
    this.editable = editable || false;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'courses-app';

  loginButtonText: string = 'Login';
  logoutButtonText: string = 'Logout';
  emptyCourseListTitle: string = 'Your List Is Empty';
  emptyCourseListText: string = 'Please use \'Add New Course\' button to add your first course';
  addNewCourseButtonText: string = "Add New Course";
  showCourseButtonText: string = "Show Course";
  defaultUsername: string = 'Harry Potter';
  editButtonName: string = 'edit';
  deleteButtonName: string = 'delete';

  headerButtonText: string = '';
  infoTitle: string = '';
  infoText: string = '';
  infoButtonText: string = '';

  testUser: User = new User();
  testCourse: Course = new Course();

  ngOnInit() {
    this.headerButtonText = this.getHeaderButtonText();
    this.infoTitle = this.emptyCourseListTitle;
    this.infoText = this.emptyCourseListText;
    this.infoButtonText = this.addNewCourseButtonText;

    this.testCourse = {
      title: "Angular",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      authors: ["Dave Hainsenberg", "Tony Ja"],
      duration: 150,
      creationDate: new Date(2012, 2, 20),
      editable: true
    }
  }

  getHeaderButtonText(): string{
    return this.testUser.hasSession ? this.logoutButtonText : this.loginButtonText;
  }

  login(event?: MouseEvent) {
    console.log(this.headerButtonText + " button event");
    
    this.testUser.hasSession = !this.testUser.hasSession;
    this.testUser.username = this.testUser.hasSession ? this.defaultUsername : '';
    this.headerButtonText = this.getHeaderButtonText();
  }

  addNewCourse(event?: MouseEvent) {
    console.log('Add New Course button event');
  }

  showCourse(event?: MouseEvent) {
    console.log('Show Course button event');
  }

  editCourse(event?: MouseEvent) {
    console.log('Edit Course button event');
  }

  deleteCourse(event?: MouseEvent) {
    console.log('Delete Course button event');
  }
}
