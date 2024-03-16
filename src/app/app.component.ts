import { Component } from '@angular/core';
import { mockedCoursesList, mockedUser } from './shared/mocks/mock';

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
  editButtonIconName: string = 'edit';
  deleteButtonIconName: string = 'delete';

  headerButtonText: string = '';
  infoTitle: string = '';
  infoText: string = '';
  infoButtonText: string = '';

  testUser = mockedUser;
  testCourses = mockedCoursesList;
  testCourse = mockedCoursesList[0];

  ngOnInit() {
    this.headerButtonText = this.getHeaderButtonText();
    this.infoTitle = this.emptyCourseListTitle;
    this.infoText = this.emptyCourseListText;
    this.infoButtonText = this.addNewCourseButtonText;
  }

  getHeaderButtonText(): string{
    return mockedUser.hasSession ? this.logoutButtonText : this.loginButtonText;
  }

  loginClick(event?: MouseEvent) {
    console.log(this.headerButtonText + " button event");
    
    mockedUser.hasSession = !mockedUser.hasSession;
    mockedUser.username = mockedUser.hasSession ? this.defaultUsername : '';
    this.headerButtonText = this.getHeaderButtonText();
  }

  addNewCourseClick(event?: MouseEvent) {
    console.log('Add New Course button event');
  }

  showCourseClick(event?: MouseEvent) {
    console.log('Show Course button event');
  }

  editCourseClick(event?: MouseEvent) {
    console.log('Edit Course button event');
  }

  deleteCourseClick(event?: MouseEvent) {
    console.log('Delete Course button event');
  }

  searchClick(event?: MouseEvent) {
    console.log('Search button event');
  }
}
