import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Constants } from '../config/constants';

@Injectable({
  providedIn: 'root'
})
export class AccountsService{

  private api_endpoint = Constants.API_ENDPOINT;
  constructor(private httpClient: HttpClient) { }

  userLogin(userloginRequest: any): Observable<any> {
    // console.log("userloginRequest: ", userloginRequest);
    return this.httpClient.post<any>( this.api_endpoint + "api/Accounts/Login", userloginRequest).pipe(catchError(this.handleError));
  }

  refreshToken(refershRequest: any): Observable<any> {
    return this.httpClient.post<any>(this.api_endpoint + "api/Accounts/RefershToken", refershRequest).pipe(catchError(this.handleError));
  }

  forgotPassword(username: any): Observable<any>{
    return this.httpClient.get<any>(this.api_endpoint + 'api/Accounts/ForgotPassword?userName=' + username).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
