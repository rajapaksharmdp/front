// signup.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user: any = {};

  constructor(private authService: AuthService, private router: Router) {}

  signup(): void {
    this.authService.signup(this.user).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
