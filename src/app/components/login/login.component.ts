// login.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  credentials: { username: string; password: string } = { username: '', password: '' };
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {

    this.authService.isAuthenticated$.subscribe((status) => {
      this.isAuthenticated = status;
    });

    // this.reload();
  }

  ngOnInit(): void {
  // this.reload();
  }

  reload(){
    window.location.reload();
  }


  login(): void {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        console.log('response', response.user)
        // Assuming your API returns user data in the response
        const userData = {
          username: response.user.username,
          email: response.user.useremail,
          role:response.user.role
        };

        // Set user data in the service
        this.userService.setUserData(userData);

        // Navigate to home or any other page
        this.router.navigate(['/home']);
      },
      (error) => {
        // Handle login error here
        console.error('Login failed', error);
      }
    );
  }

  logout(): void {
    // Assuming your logout logic is asynchronous
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  clearUserData(): void {
    // this.userData = null;
    sessionStorage.removeItem('userData');
  }
}
