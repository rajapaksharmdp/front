import { Component } from '@angular/core';
import { AuthService } from './service/auth/auth.service';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';
  user: any; 
  constructor(private authService: AuthService,private userService: UserService) {this.user = this.userService.getUserData();
    console.log('this.user', this.user)}

  isAuthenticated(): boolean {
    
    return this.authService.isAuthenticated();
    
  }

  logout(): void {
    this.authService.logout();
    
    // Add any additional logout logic if needed
  }
}
