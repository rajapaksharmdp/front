import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/model/book.model';
import { CartService } from 'src/app/service/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Book[] = [];
  totalCartPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
    });

    this.cartService.getTotalPrice().subscribe((totalPrice) => {
      this.totalCartPrice = totalPrice;
    });
  }

  removeFromCart(bookId: number): void {
    this.cartService.removeFromCart(bookId);
  }

  increaseQuantity(item: Book): void {
    this.cartService.addToCart(item.bookid);
  }

  decreaseQuantity(item: Book): void {
    this.cartService.decreaseQuantity(item.bookid);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
