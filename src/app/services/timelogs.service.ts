import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../config/constants';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimelogsService {
  private api_key = localStorage.getItem("token");
  private requestOptions: { headers: HttpHeaders };
  private api_endpoint = Constants.API_ENDPOINT; 
  constructor(private httpClient: HttpClient) {
    this.requestOptions = { headers: this.getCommonHeaders() }
  }
  private getCommonHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.api_key}`
    });
  }
  
  getMyMonthlyTimeLog(request: any): Observable<any>{
    return this.httpClient.post<any>(this.api_endpoint + 'api/WorkSpace/GetMyMonthlyTimeLogs', request, this.requestOptions).pipe(catchError(this.handleError));
  }
  
  getMyYearlyTimeLog(request: any): Observable<any>{
    return this.httpClient.post<any>(this.api_endpoint + 'api/WorkSpace/GetMyYearlyTimeLog', request, this.requestOptions).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    console.log("project service error", error);
    return throwError(() => error);
  }
}
