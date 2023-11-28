import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { BookService } from 'src/app/service/book.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent {
  // isLoggedIn: boolean;

  user: any;
  booksInStore: any[] = [];

  
  constructor(private authService: AuthService, private bookService: BookService,private userService:UserService) {
   
    this.user = this.userService.getUserData();
  }
  isAuthenticated(): boolean {
    
    return this.authService.isAuthenticated();
    
  }

  ngOnInit(): void {
    this.user = this.userService.getUserData();

    // Fetch books from the store using your book service
    this.bookService.getBooks().subscribe((books) => {
      this.booksInStore = books;
      // this.rating =this.books.rating
      // console.log('this.books', this.books)
      // this.bookid=books.bookid;
    });
  }

}