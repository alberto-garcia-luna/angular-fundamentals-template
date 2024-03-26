import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { mockedCoursesList } from './shared/mocks/mock';
import { AuthService, User } from './auth/services/auth.service';
import { UserService } from './user/services/user.service';
import { SessionStorageService } from './auth/services/session-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'courses-app';

  emptyCourseListTitle: string = 'Your List Is Empty';
  emptyCourseListText: string = 'Please use \'Add New Course\' button to add your first course';
  addNewCourseButtonText: string = "Add New Course";
  showCourseButtonText: string = "Show Course";
  editButtonIconName: string = 'edit';
  deleteButtonIconName: string = 'delete';

  headerButtonText: string = 'Login';
  infoTitle: string = '';
  infoText: string = '';
  infoButtonText: string = '';

  user: User = this.getEmptyUser();
  testCourse = mockedCoursesList[0];

  constructor(private authService: AuthService, 
    private userService: UserService,
    private sessionStorageService: SessionStorageService,
    private router: Router) {}

  ngOnInit(): void {
    this.infoTitle = this.emptyCourseListTitle;
    this.infoText = this.emptyCourseListText;
    this.infoButtonText = this.addNewCourseButtonText;
  }

  loadHeader() {
    if (this.authService.isAuthorised) {
      this.userService.getUser()
        .subscribe(response => {
          this.user = response;
          this.headerButtonText = this.getHeaderButtonText();
        });
    }    
  }

  getHeaderButtonText(): string{
    return this.authService.isAuthorised ? 'Logout' : 'Login';
  }

  logoutClick(event?: MouseEvent) {
    console.log(this.headerButtonText + " button event");
    
    if (!this.authService.isAuthorised){
      this.router.navigate(['/login']);
    }

    this.authService.logout(this.getSessionToken())
      .subscribe(() => {
        this.headerButtonText = this.getHeaderButtonText();
        this.user = this.getEmptyUser();
        this.router.navigate(['/login']);
      });
  }

  addNewCourseClick(event?: MouseEvent) {
    console.log('Add New Course button event');
  }

  getEmptyUser(): User {
    return {
      name: '',
      email: '',
      password: ''
    };
  }

  getSessionToken(): string{
    const token = this.sessionStorageService.getToken();
    if (token) {
      return token.replace('Bearer ', '');
    }

    return '';
  }
}
