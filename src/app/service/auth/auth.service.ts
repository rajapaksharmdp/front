import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4000/api';

  // Check session storage during initialization
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    sessionStorage.getItem('userData') !== null
  );
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  signup(user: any): Observable<any> {
    const signupUrl = `${this.apiUrl}/users`;
    return this.http.post(signupUrl, user);
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    const loginUrl = `${this.apiUrl}/login`;
    return this.http.post(loginUrl, credentials).pipe(
      tap(() => {
        this.isAuthenticatedSubject.next(true);

        // Save user data to session storage
        sessionStorage.setItem('userData', JSON.stringify(credentials));
      })
    );
  }

  logout(): void {
    // Perform any additional cleanup if needed
    this.isAuthenticatedSubject.next(false);

    // Clear session storage
    sessionStorage.removeItem('userData');
       // Reload the page
      
       // Navigate to the login page
       this.router.navigate(['/login']);
      //  window.location.reload();

  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
