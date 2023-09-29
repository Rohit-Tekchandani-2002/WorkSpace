import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Constants } from '../config/constants';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  
  private api_key = localStorage.getItem("token");
  private requestOptions: { 
    headers: HttpHeaders,
    reportProgress: true 
  };
  private api_endpoint = Constants.API_ENDPOINT; 
  constructor(private httpClient: HttpClient) {
    this.requestOptions = { headers: this.getCommonHeaders() , reportProgress: true}
  }
  private getCommonHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.api_key}`
    });
  }
  uploadFile(request: FormData): Observable<any> {
    return this.httpClient.post<any>(this.api_endpoint + 'api/Project/AddWorkItemAttachment', request, this.requestOptions).pipe(catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}