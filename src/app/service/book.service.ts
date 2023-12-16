import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Book } from '../model/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'virtualbookstore.azurewebsites.net/api'; // 
  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/getbooks`);
  }

  getBookById(id: number): Observable<Book | undefined> {
    return this.http.get<Book>(`${this.apiUrl}/books/${id}`);
  }

  getCategories1(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`);
  }

  getCategories(category: string): Observable<Book[]> {
    // Make the HTTP request based on the provided category
    return this.http.get<Book[]>(`${this.apiUrl}/getbooks/${category}`);
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/getallbooks`);
  }

  searchBooks(category: string, searchTerm: string): Observable<Book[]> {
    // Set up parameters for the search
    let params = new HttpParams();
    params = params.set('category', category);
    params = params.set('searchTerm', searchTerm);

    // Make the HTTP request
    return this.http.get<Book[]>(`${this.apiUrl}/search`, { params });
  }
}
