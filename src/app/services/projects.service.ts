import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../config/constants';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
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
  getProjectTech(): Observable<any> {
    return this.httpClient.get<any>( this.api_endpoint + 'api/Project/GetProjectTech', this.requestOptions).pipe(catchError(this.handleError));
  }
  getProjects(request: any): Observable<any>{
    return this.httpClient.post<any>( this.api_endpoint + 'api/Project/GetProjects', request ,this.requestOptions).pipe(catchError(this.handleError));
  }
  getWorkGroup(id: any): Observable<any>{
    return this.httpClient.get<any>(this.api_endpoint + 'api/Project/GetWorkGroups?projectId=' + id, this.requestOptions).pipe(catchError(this.handleError));
  }
  getProjectStatusCount(id: any): Observable<any>{
    return this.httpClient.get<any>(this.api_endpoint + 'api/Project/GetProjectStatusCount?projectId=' + id, this.requestOptions).pipe(catchError(this.handleError));
  }
  getWorkGroupStatusCount(id: any, workId: any): Observable<any>{
    return this.httpClient.get<any>(this.api_endpoint + 'api/Project/GetProjectStatusCount?projectId=' + id + '&workGroupId=' + workId, this.requestOptions).pipe(catchError(this.handleError));
  }
  getWorkGroupInfo(request: any): Observable<any>{
    return this.httpClient.post<any>(this.api_endpoint + 'api/Project/GetWorkLog', request, this.requestOptions).pipe(catchError(this.handleError));
  }
  getAllWorkGroupForProject(id: any): Observable<any>{
    return this.httpClient.get<any>(this.api_endpoint + 'api/Project/GetAllWorkGroup?projectId=' + id, this.requestOptions).pipe(catchError(this.handleError));
  }
  getEmployeeList(): Observable<any>{
    return this.httpClient.get<any>(this.api_endpoint + 'api/EmplyeeDetails/EmployeeNameAndId', this.requestOptions).pipe(catchError(this.handleError));
  }
  getProjectBackLog(request: any): Observable<any>{
    // console.log(request);
    return this.httpClient.post<any>(this.api_endpoint + 'api/Project/GetProjectBackLog', request, this.requestOptions).pipe(catchError(this.handleError));
  }
  getWorkGroupFromId(id: any): Observable<any>{
    return this.httpClient.get<any>(this.api_endpoint + 'api/Project/GetWorkGroupFromId?workGroupId=' + id, this.requestOptions).pipe(catchError(this.handleError));
  }
  getWorkLogFromId(request: any): Observable<any>{
    return this.httpClient.post<any>(this.api_endpoint + 'api/Project/GetWorkLog', request, this.requestOptions).pipe(catchError(this.handleError));
  }
  updateWorkLog(request: any): Observable<any>{
    return this.httpClient.put<any>(this.api_endpoint + 'api/Project/UpdateWorkItem' , request, this.requestOptions).pipe(catchError(this.handleError));
  }
  addWorkLog(request: any): Observable<any>{
    return this.httpClient.post<any>(this.api_endpoint + 'api/Project/AddWorkLog', request, this.requestOptions).pipe(catchError(this.handleError));
  }
  updateProjectWorkItemTime(request: any): Observable<any>{
    return this.httpClient.put<any>(this.api_endpoint + 'api/Project/UpdateProjectWorkItemTime', request, this.requestOptions).pipe(catchError(this.handleError));
  }
  getEmployeeInfo(id: any): Observable<any>{
    return this.httpClient.get<any>(this.api_endpoint + 'api/DashBoard/EmployeeInfo?employeeId=' + id, this.requestOptions).pipe(catchError(this.handleError));
  }
  getSubProjectList(id: any): Observable<any>{
    return this.httpClient.get<any>(this.api_endpoint + 'api/Project/GetAllWorkGroupSubProject?projectId=' + id, this.requestOptions).pipe(catchError(this.handleError));
  }
  addWorkItem(request: any): Observable<any>{
    return this.httpClient.post<any>(this.api_endpoint + 'api/Project/AddWorkItem', request, this.requestOptions).pipe(catchError(this.handleError));
  }
  updateWorkItem(request: any): Observable<any>{
    return this.httpClient.put<any>(this.api_endpoint + 'api/Project/UpdateWorkItem', request, this.requestOptions).pipe(catchError(this.handleError));
  }
  getProjectWorkItem(id: any): Observable<any>{
    return this.httpClient.get<any>(this.api_endpoint + 'api/Project/GetProjectWorkItem?projectWorkId=' + id, this.requestOptions).pipe(catchError(this.handleError));
  }
  getProjectStatusState(id: any): Observable<any>{
    return this.httpClient.get<any>(this.api_endpoint+ 'api/Project/GetWorkItemState?projectWorkId=' + id, this.requestOptions).pipe(catchError(this.handleError));
  }
  addWorkItemComments(request: any): Observable<any>{
    return this.httpClient.post<any>(this.api_endpoint+ 'api/Project/AddWorkItemComment', request, this.requestOptions).pipe(catchError(this.handleError));
  }
  getWorkItemComments(id: any): Observable<any>{
    return this.httpClient.get<any>(this.api_endpoint+ 'api/Project/GetWorkItemComments?projectWorkId=' + id, this.requestOptions).pipe(catchError(this.handleError));
  }
  deleteWorkComment(id: any): Observable<any>{
    return this.httpClient.delete<any>(this.api_endpoint+ 'api/Project/DeleteWorkItemComments?WorkItemCommentId=' + id, this.requestOptions).pipe(catchError(this.handleError));
  }
  deleteWorkItemLog(id: any): Observable<any>{
    return this.httpClient.delete<any>(this.api_endpoint+ 'api/Project/DeleteWorkLog?WorkLogId=' + id, this.requestOptions).pipe(catchError(this.handleError));
  }
  deleteWorkItemAttachment(id: any): Observable<any>{
    return this.httpClient.delete<any>(this.api_endpoint+ 'api/Project/DeleteWorkItemAttachment?workItemAttachmentsId=' + id, this.requestOptions).pipe(catchError(this.handleError));
  }
  getWorkItemHistory(request: any): Observable<any>{
    return this.httpClient.post<any>(this.api_endpoint + 'api/Project/GetWorkItemHistory', request, this.requestOptions).pipe(catchError(this.handleError));
  }
  getProjectWorkId(id: any): Observable<any>{
    return this.httpClient.get<any>(this.api_endpoint + 'api/Project/GetWorkLogs?projectWorkId=' + id, this.requestOptions).pipe(catchError(this.handleError));
  }
  getProjectWorkAttachments(id: any): Observable<any>{
    return this.httpClient.get<any>(this.api_endpoint + 'api/Project/GetWorkItemAttachments?projectWorkId=' + id, this.requestOptions).pipe(catchError(this.handleError));
  }
  updateProjectItemWorkLog(request: any): Observable<any>{
    return this.httpClient.put<any>(this.api_endpoint + 'api/Project/UpdateWorkLog', request, this.requestOptions).pipe(catchError(this.handleError));
  }
  getProjectTeamRoster(id: any): Observable<any>{
    return this.httpClient.get<any>(this.api_endpoint + 'api/Project/GetProjectTeamRosterDetail?projectId=' + id, this.requestOptions).pipe(catchError(this.handleError));
  }
  getActivityStream(request: any): Observable<any>{
    return this.httpClient.post<any>(this.api_endpoint + 'api/Project/GetProjectActivityStreamRequest', request, this.requestOptions).pipe(catchError(this.handleError));
  }
  getProjectWorkGroupLogs(request: any): Observable<any>{
    return this.httpClient.post<any>(this.api_endpoint + 'api/Project/GetWorkGroupLogWithPagination', request, this.requestOptions).pipe(catchError(this.handleError));
  }
  getWorkLogFromProjectId(request: any): Observable<any>{
    return this.httpClient.post<any>(this.api_endpoint + 'api/Project/GetWorkBackLogFromProjectId', request, this.requestOptions).pipe(catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    console.log("project service error", error);
    return throwError(() => error);
  }
}
