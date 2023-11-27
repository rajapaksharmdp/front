import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Book } from '../model/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:4000/api'; // Replace with your actual backend URL

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/getbooks`);
  }

  getBookById(id: number): Observable<Book | undefined> {
    return this.http.get<Book>(`${this.apiUrl}/books/${id}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`);
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/getallbooks`);
  }

  searchBooks(category: string, searchTerm: string): Observable<Book[]> {
    const queryParams = {
      category: category === 'All' ? '' : category,
      searchTerm: searchTerm || '',
    };

    return this.http.get<Book[]>(`${this.apiUrl}/search`, { params: queryParams });
  }
}
