import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sweetalert2Service } from 'src/app/shared/swal.service';
import * as jwt_decode from 'jwt-decode';
import { retry, catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userid;
  constructor(private http: HttpClient, private toast: Sweetalert2Service, private route: ActivatedRoute) { }
  facebookLogin() {

  }

  googleLogin() {
    window.location.assign('http://localhost:3000/auth/google');
  }



  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    this.toast.show('warning', 'Logaut');
  }


  getToken() {
    const token = localStorage.getItem('token');
    const decode = jwt_decode(token);
    return decode;

  }
  public isLoggedIn() {
    return localStorage.getItem('token') !== null;

  }

  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
