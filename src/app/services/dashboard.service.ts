import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { userNameResponce } from '../models/dashboard-model';
import { Constants } from '../config/constants';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private api_key = localStorage.getItem("token");
  private requestOptions: {headers: HttpHeaders};
  private api_endpoint = Constants.API_ENDPOINT;

  constructor(private httpClient: HttpClient) { 
    this.requestOptions = {headers: this.getCommonHeaders()}
  }

  private getCommonHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.api_key}`
    });
  }

  employeeInfo(id: any): Observable<any> {
    return this.httpClient.get<any>(this.api_endpoint + 'api/DashBoard/EmployeeInfo?employeeId=' + id , this.requestOptions).pipe(catchError(this.handleError));
  }

  getUserProjects(id: any): Observable<any> {
    return this.httpClient.get<any>(this.api_endpoint + 'api/DashBoard/GetUserProjects?employeeId=' + id , this.requestOptions).pipe(catchError(this.handleError));
  }

  getNewsAndUpdates(): Observable<any>{
    return this.httpClient.get<any>(this.api_endpoint + 'api/DashBoard/GetnewsAndUpdates', this.requestOptions).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
