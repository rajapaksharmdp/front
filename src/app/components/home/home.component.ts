import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router) {}

  searchBooks() {
    // Implement book search logic here
  }

  navigateToAbout() {
    this.router.navigate(['/about']);
  }

  navigateToCategories() {
    this.router.navigate(['/categories']);
  }

  navigateToContacts() {
    this.router.navigate(['/contacts']);
  }
}
