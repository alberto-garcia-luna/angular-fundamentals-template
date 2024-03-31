import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { SessionStorageService } from './auth/services/session-storage.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'courses-app';

  showCourseButtonText: string = "Show Course";
  editButtonIconName: string = 'edit';
  deleteButtonIconName: string = 'delete';

  infoTitle: string = 'Your List Is Empty';
  infoText: string = 'Please use \'Add New Course\' button to add your first course';
  infoButtonText: string = 'Add New Course';
  
  username!: Observable<string>;
  isAdmin!: Observable<boolean>;

  constructor(private authService: AuthService, 
    private sessionStorageService: SessionStorageService,
    private router: Router) {}

  ngOnInit(): void {
    this.username = this.authService.name$;
    this.isAdmin = this.authService.isAdmin$;
  }

  logoutClick(event?: MouseEvent) {
    console.log(this.getHeaderButtonText() + " button event");
    
    if (!this.authService.isAuthorised) {
      this.router.navigate(['/login']);
    } else {
      this.authService.logout(this.getSessionToken())
        .subscribe(() => { 
          this.router.navigate(['/login'])
      });
    }
  }

  getHeaderButtonText(): string{
    return this.authService.isAuthorised ? 'Logout' : 'Login';
  }

  getSessionToken(): string{
    const token = this.sessionStorageService.getToken();
    if (token) {
      return token.replace('Bearer ', '');
    }

    return '';
  }
}
