import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  readonly userKey = 'loggeduser';
  isLoggedIn = signal<boolean>(false); // Signal to track login status
  userEmail = signal<string | null>(null); // Signal for user email

  apiurl = "http://localhost:3000";

  constructor(private http: HttpClient) {
    // Initialize the signals based on localStorage value
    if (typeof localStorage !== 'undefined') {
      const storedUser = localStorage.getItem(this.userKey);
      if (storedUser) {
        this.isLoggedIn.set(true);
        const user = JSON.parse(storedUser);
        this.userEmail.set(user.name); // Initialize user email from stored user
      }
    }
  }

  saveuser(obj: any): Observable<any> {
    console.log(obj);
    return this.http.post(`${this.apiurl}/users`, obj).pipe(
      catchError(error => {
        console.error('Error saving user', error);
        return throwError(error);
      })
    );
  }

  login(user: any): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.userKey, JSON.stringify(user));
      this.isLoggedIn.set(true);
      this.userEmail.set(user.name); // Set user email in signal
    }
  }

  logout(): void {
    console.log('Logging out');
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.userKey);
      this.isLoggedIn.set(false);
      this.userEmail.set(null); // Clear the email on logout
    }
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiurl}/users`).pipe(
      catchError(error => {
        console.error('Error fetching all users', error);
        return throwError(error);
      })
    );
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.apiurl}/users/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching user by ID', error);
        return throwError(error);
      })
    );
  }

  updateUser(id: string, userData: any): Observable<any> {
    return this.http.put(`${this.apiurl}/users/${id}`, userData).pipe(
      catchError(error => {
        console.error('Error updating user', error);
        return throwError(error);
      })
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiurl}/users/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting user', error);
        return throwError(error);
      })
    );
  }
}
