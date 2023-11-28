import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/model/book.model';
import { BookService } from 'src/app/service/book.service';
import { CartService } from 'src/app/service/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-itemdetail',
  templateUrl: './itemdetail.component.html',
  styleUrls: ['./itemdetail.component.css']
})
export class ItemdetailComponent implements OnInit{

  book: Book | undefined;

  constructor(private route: ActivatedRoute, private bookService: BookService, private router: Router,private cartService: CartService) {}

  ngOnInit(): void {
    // Retrieve the book ID from the route parameters
    const bookId = this.route.snapshot.paramMap.get('id');
    // console.log('bookId', bookId)

    if (bookId) {
      // Fetch the book details based on the ID
      this.bookService.getBookById(parseInt(bookId, 10)).subscribe((book) => {
        this.book = book;
        // console.log('this.book', this.book)
      });
    }
  }


  addToCart(bookId: number): void {
    // console.log('Adding to cart:', bookId);
      // Pass the book id to addToCart instead of the entire book object
      this.cartService.addToCart(bookId)

      Swal.fire({
        title: 'Success',
        text: 'Book added to cart successfully!',
        icon: 'success',
      });

      
    
  }


  viewItemDetails(book: Book): void {
    // Navigate to the itemdetail page with the book details
    this.router.navigate(['/itemdetail', book.bookid]);
  }
}
