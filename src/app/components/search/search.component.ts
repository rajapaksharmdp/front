import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/model/book.model';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  categories: string[] = [];
  selectedCategory: string = 'All';
  searchTerm: string = '';
  books: Book[] = [];
  filteredBooks: Book[] = [];

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    // Initialize categories and books
    this.bookService.getCategories().subscribe(
      (categories) => {
        this.categories = ['All', ...categories];
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
    // Filter books based on the selected category and/or book name
    this.filteredBooks = this.books.filter(
      (book) =>
        (this.selectedCategory === 'All' || book.category === this.selectedCategory) &&
        (book.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          this.searchTerm === '')
    );
  }

  viewItemDetails(book: Book): void {
    // Navigate to the itemdetail page with the book details
    this.router.navigate(['/itemdetail', book.bookid]);
  }
}
