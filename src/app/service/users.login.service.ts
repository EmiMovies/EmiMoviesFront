import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { User } from '../model/user';

import { catchError, throwError, tap, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environment/environment';
export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class UsersloginService {
  constructor(private http: HttpClient, private router: Router) {}
  userSubject = new BehaviorSubject<User>(null);
  private tokenExpirationTime: any;
  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          environment.apiUrl +
          '',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) =>
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
        )
      );
  }

  logout() {
    this.userSubject.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTime) {
      clearTimeout(this.tokenExpirationTime);
    }
    this.tokenExpirationTime = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTime = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
      this.userSubject.next(loadedUser);
    }
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          environment.apiUrl +
          '',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    {
      const user = new User(
        email,
        userId,
        token,
        new Date(new Date().getTime() + expiresIn * 1000)
      );
      this.userSubject.next(user);
      localStorage.setItem('userData', JSON.stringify(user));
      this.router.navigate(['/']);
      this.autoLogout(expiresIn * 1000);
    }
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!err.error || !err.error.error) {
      return throwError(() => errorMessage);
    }
    switch (err.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist';
        break; 
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct';
        break; 
      case 'USER_DISABLED':
        errorMessage = 'This user has been disabled';
        break; 
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break; 
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project';
        break; 
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage =
          'We have blocked all requests from this device due to unusual activity. Try again later';
        break; 
      default:
        errorMessage = 'An error has occurred';
        break;
    }
    return throwError(() => errorMessage);
  }
}