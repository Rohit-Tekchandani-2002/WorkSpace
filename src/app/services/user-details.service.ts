import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { changePasswordRequest, notificaiotnRequest } from '../models/user-details-model';
import { Constants } from '../config/constants'
@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
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

  getEmployeeDetails(id: any): Observable<any> {
    return this.httpClient.get<any>( this.api_endpoint + 'api/EmplyeeDetails/EmployeeInfo?employeeId=' + id, this.requestOptions).pipe(catchError(this.handleError));
  }

  changePassword(request: changePasswordRequest): Observable<any> {
    console.log("request ", request);
    return this.httpClient.put<any>(this.api_endpoint + 'api/EmplyeeDetails/ChangePassword', request, this.requestOptions).pipe(catchError(this.handleError));
  }

  chageNotificationSetting(request: notificaiotnRequest): Observable<any> {
    console.log("request ", request);
    return this.httpClient.put<any>(this.api_endpoint + 'api/EmplyeeDetails/ChageNotificationSetting', request, this.requestOptions).pipe(catchError(this.handleError));
  }

  getPresonalinfo(id: any): Observable<any> {
    return this.httpClient.get<any>(this.api_endpoint + 'api/EmplyeeDetails/GetEmployeePresonalInfo?employeeId=' + id, this.requestOptions).pipe(catchError(this.handleError));
  }

  updatePersonalInfo(request: any): Observable<any>{
    return this.httpClient.put<any>(this.api_endpoint + 'api/EmplyeeDetails/UpdatePersonalInfo', request, this.requestOptions).pipe(catchError(this.handleError));
  }

  gettravelInfo(id: any): Observable<any> {
    return this.httpClient.get<any>(this.api_endpoint + 'api/EmplyeeDetails/GetEmployeeTravelInfo?employeeId=' + id, this.requestOptions).pipe(catchError(this.handleError));
  }

  createCountryVisaInfo(request: any): Observable<any>{
    return this.httpClient.post<any>(this.api_endpoint + 'api/EmplyeeDetails/CreateCountryVisaInfo', request, this.requestOptions).pipe(catchError(this.handleError));
  }

  updateCountryVisaInfo(request: any): Observable<any>{
    return this.httpClient.put<any>(this.api_endpoint + 'api/EmplyeeDetails/UpdateCountryVisaInfo', request, this.requestOptions).pipe(catchError(this.handleError));
  }

  deleteCountryVisaInfo(id: any): Observable<any>{
    return this.httpClient.delete<any>(this.api_endpoint + 'api/EmplyeeDetails/DeleteCountryVisaInfo?visaInfoId=' + id, this.requestOptions).pipe(catchError(this.handleError));
  }

  getSystemconfig(id: any): Observable<any> {
    return this.httpClient.get<any>(this.api_endpoint + "api/EmplyeeDetails/GetSystemConfiguration?employeeId=" + id, this.requestOptions).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
