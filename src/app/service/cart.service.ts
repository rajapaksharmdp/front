import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Book } from '../model/book.model';
import { BookService } from './book.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  cartItems$: Observable<Book[]> = this.cartItemsSubject.asObservable();

  private readonly STORAGE_KEY = 'cart';

  constructor(private bookService: BookService) {
    const storedCart = sessionStorage.getItem(this.STORAGE_KEY);
    if (storedCart) {
      this.cartItemsSubject.next(JSON.parse(storedCart));
    }
  }

  addToCart(bookId: number): void {
    this.bookService.getBookById(bookId).subscribe((book) => {
      if (book) {
        const currentCartItems = this.cartItemsSubject.value;
        const existingCartItem = currentCartItems.find((item) => item.bookid === book.bookid);

        if (existingCartItem) {
          // If the item already exists in the cart, update its quantity
          existingCartItem.quantity += 1;
          this.cartItemsSubject.next([...currentCartItems]);
        } else {
          // If the item is not in the cart, add it
          const updatedCartItems = [...currentCartItems, { ...book, quantity: 1 }];
          this.cartItemsSubject.next(updatedCartItems);
        }

        this.saveCartToStorage(this.cartItemsSubject.value);
      }
    });
  }

  removeFromCart(bookId: number): void {
    const currentCartItems = this.cartItemsSubject.value;
    const updatedCartItems = currentCartItems.filter((book) => book.bookid !== bookId);
    this.cartItemsSubject.next(updatedCartItems);
    this.saveCartToStorage(updatedCartItems);
  }

  getCartItems(): Observable<Book[]> {
    return this.cartItems$;
  }

  getTotalPrice(): Observable<number> {
    return this.cartItems$.pipe(
      map((items) => items.reduce((total, book) => total + book.price * book.quantity, 0))
    );
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
    this.saveCartToStorage([]);
  }

  private saveCartToStorage(cart: Book[]): void {
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
  }

  decreaseQuantity(bookId: number): void {
    const currentCartItems = this.cartItemsSubject.value;
    const updatedCartItems = [...currentCartItems];
    const index = updatedCartItems.findIndex((item) => item.bookid === bookId);
  
    if (index !== -1) {
      if (updatedCartItems[index].quantity > 1) {
        updatedCartItems[index].quantity -= 1;
      } else {
        updatedCartItems.splice(index, 1);
      }
      this.cartItemsSubject.next(updatedCartItems);
    }
  }
}
