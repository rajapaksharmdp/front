import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/model/book.model';
import { BookService } from 'src/app/service/book.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  categories: string[] = ['All', 'Kids', 'History', 'Science', 'Novel'];
  selectedCategory: string = 'All';
  searchTerm: string = '';
  books: Book[] = [];
  filteredBooks: Book[] = [];

  constructor(private bookService: BookService, private router: Router,private cartService: CartService) {}

  ngOnInit(): void {
    // Initialize categories and books
    this.search();

    this.bookService.getCategories1().subscribe(
      (categories) => {
        this.categories = ['All', 'Kids', 'History', 'Science', 'Novel'];
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );

    this.bookService.getAllBooks().subscribe(
      (books) => {
        this.books = books;
        this.filteredBooks = books;
      },
      (error) => {
        console.error('Error fetching books', error);
      }
    );
  }

  search(): void {
    // Call getBooks with the selected category
    this.bookService.getCategories(this.selectedCategory).subscribe(
      (books) => {
        // Filter books based on the selected category and/or book name
        this.filteredBooks = books.filter(
          (book) =>
            (book.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
              this.searchTerm === '')
        );
      },
      (error) => {
        console.error('Error fetching books', error);
      }
    );
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
