import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent {
  // isLoggedIn: boolean;

  user: any; 
  constructor(private authService: AuthService){}

  isAuthenticated(): boolean {
    
    return this.authService.isAuthenticated();
    
  }

}