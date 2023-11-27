import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/model/book.model';
import { BookService } from 'src/app/service/book.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  books: Book[] = [];
  bookid:any;
  book!: Book;

  constructor(private bookService: BookService, private router: Router,private cartService: CartService) {}

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
    this.bookService.getBooks().subscribe((books) => {
      this.books = books;
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

  
}
