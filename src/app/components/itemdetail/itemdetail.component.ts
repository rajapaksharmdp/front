import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/model/book.model';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-itemdetail',
  templateUrl: './itemdetail.component.html',
  styleUrls: ['./itemdetail.component.css']
})
export class ItemdetailComponent implements OnInit{

  book: Book | undefined;

  constructor(private route: ActivatedRoute, private bookService: BookService) {}

  ngOnInit(): void {
    // Retrieve the book ID from the route parameters
    const bookId = this.route.snapshot.paramMap.get('id');

    if (bookId) {
      // Fetch the book details based on the ID
      this.bookService.getBookById(parseInt(bookId, 10)).subscribe((book) => {
        this.book = book;
        console.log('this.book', this.book)
      });
    }
  }
}
