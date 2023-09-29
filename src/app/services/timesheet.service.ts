import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../config/constants';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
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
  getTimeSheet(request: any): Observable<any>{
    return this.httpClient.post<any>(this.api_endpoint + 'api/Project/GetTimeSheet', request, this.requestOptions).pipe(catchError(this.handleError));
  }
  getMonthlyTimeSheet(request: any): Observable<any>{
    return this.httpClient.post<any>(this.api_endpoint + 'api/Project/GetTimeSheetDailyTimeLogEmployeeAndDate', request, this.requestOptions).pipe(catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    console.log("project service error", error);
    return throwError(() => error);
  }
}
