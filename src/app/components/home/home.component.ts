import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/model/book.model';
import { BookService } from 'src/app/service/book.service';
import { CartService } from 'src/app/service/cart.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // changeDetection: ChangeDetectionStrategy.Default,
})
export class HomeComponent implements OnInit{

  books: Book[] = [];
  bookid:any;
  book!: Book;
  user: any; 
  rating:any;
 

  constructor(private bookService: BookService, private router: Router,private cartService: CartService,private userService: UserService) {
    this.user = this.userService.getUserData();
  }

  private isReloading = false;

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

 

  

  ngOnInit(): void {
    this.user = this.userService.getUserData();
    // this.reloadPage()
    this.bookService.getBooks().subscribe((books) => {
      this.books = books;
      // this.rating =this.books.rating
      console.log('this.books', this.books)
      // this.bookid=books.bookid;
    });
  }

  addToCart(bookId: number): void {
    console.log('Adding to cart:', bookId);
      // Pass the book id to addToCart instead of the entire book object
      this.cartService.addToCart(bookId);
    
  }

  viewItemDetails(book: Book): void {
    // Navigate to the itemdetail page with the book details
    this.router.navigate(['/itemdetail', book.bookid]);
  }

  
  reloadPage(): void {
    if (!this.isReloading) {
      this.isReloading = true;
      location.reload();
    }
  }
}
