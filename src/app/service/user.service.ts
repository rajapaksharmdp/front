import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:4000/api';
  private apiUrl2 = 'http://localhost:4000/api/users';

  private userData: any;

  constructor(private http: HttpClient) {}

  addUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, userData);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${username}`);
  }

  updateUser(username: string, updateData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${username}`, updateData);
  }

  deleteUser(username: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${username}`);
  }

  // login(credentials: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/login`, credentials);
  // }

  signup(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl2}`, user);
  }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post('/api/login', credentials);
  }

  setUserData(user: any): void {
    this.userData = user;
    sessionStorage.setItem('userData', JSON.stringify(user));
  }

  getUserData(): any {
    return this.userData || JSON.parse(sessionStorage.getItem('userData') || '{}');
  }

  clearUserData(): void {
    this.userData = null;
    sessionStorage.removeItem('userData');
  }
}
