import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SlideInOutAnimation } from 'src/app/animation';
import { AddAttachmentsComponent } from 'src/app/components/add-attachments/add-attachments.component';
import { DeleteItemComponent } from 'src/app/components/delete-item/delete-item.component';
import { UpdateProjectItemWorklogComponent } from 'src/app/components/update-project-item-worklog/update-project-item-worklog.component';
import { UpdateWorklogDialogComponent } from 'src/app/components/update-worklog-dialog/update-worklog-dialog.component';
import { ProjectStatus, WorkFlowType, environment } from 'src/app/config/constants';
import { AddCommentsRequest, DropDownResponce, ProjectStatusState, ProjectWorkAttchments, WorkItemComments, WorkItemHistory, WorkItemHistoryRequest, WorkItemLog, WorkLog, employeeInfo, workItem } from 'src/app/models/project-model';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-work-item',
  templateUrl: './work-item.component.html',
  styleUrls: ['./work-item.component.css'],
  animations: [SlideInOutAnimation]
})
export class WorkItemComponent implements OnInit {

  id = '0';
  projectId = localStorage.getItem('ProjectId') ?? '0';
  workGroupId = localStorage.getItem('workGroupId');
  isAuthenticated: boolean = false;
  workFlowType: typeof WorkFlowType = WorkFlowType;
  projectStatus: typeof ProjectStatus = ProjectStatus;
  ProjectStatusState: ProjectStatusState[] = [];
  ProjectWorkAttchments: ProjectWorkAttchments[] = [];
  assignedEmployeeName = '';
  reportedEmployeeName = '';
  workItem: workItem = {
    title: null,
    workGroupId: null,
    workFlow: null,
    priority: null,
    projectStatusId: null,
    startDate: null,
    endDate: null,
    originalEstTime: null,
    remainingEstTime: null,
    totalWorkDone: null,
    assignedEmployeeId: null,
    reportedEmployeeId: null,
    subProjectId: null,
    releasedToProduction: null,
    rsi: null,
    description: null,
    createdAt: null,
    updateAt: null
  }
  WorkLog: WorkLog = {
    projectWorkId: BigInt(this.id),
    title: this.workItem.title ?? '',
    startDate: this.workItem.startDate ?? new Date(),
    endDate: this.workItem.endDate ?? new Date(),
    originalEstTime: this.workItem.originalEstTime ?? 0,
    remainingEstTime: this.workItem.remainingEstTime ?? 0,
    assignedTo: this.assignedEmployeeName,
    workPriority: this.workItem.priority ?? '',
    projectStatusId: this.workItem.projectStatusId ?? 1,
    createdAt: this.workItem.createdAt ?? new Date(),
    totalWorkDone: this.workItem.totalWorkDone ?? 0,
  }
  employeeInfo: employeeInfo = {
    profileImage: null,
    firstName: null,
    lastName: null
  };
  AddCommentsRequest: AddCommentsRequest = {
    projectWorkId: '',
    employeeId: '',
    comments: ''
  }
  addCommentsForm = this.formBuilder.group({
    comments: ['']
  });
  workGroup: DropDownResponce[] = [];
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  WorkItemComments: WorkItemComments[] = [];
  WorkItemHistorys: WorkItemHistory[] = [];
  WorkItemLogs: WorkItemLog[] = [];
  workItemHistoryCount = 0;
  isLoading = false;
  currentpage = 1;
  sortBy = 'WIH.CreatedAt';
  isSortByAsc = true;
  pageSizes = [3, 10, 20, 100];
  Pages: number[] = [];
  WorkItemHistoryRequest: WorkItemHistoryRequest = {
    workItemId: String(this.id),
    pageNumber: 1,
    pageSize: this.pageSizes[0],
    expression: this.sortBy,
    isSortByAsc: this.isSortByAsc
  }
  searchProjectLogForm = this.formBuilder.group({
    pageSize: this.pageSizes[0]
  });
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private api: ProjectsService,
    private dialog: MatDialog,
    private router: Router,
    private alertService: AlertService
  ) {
    environment.showProject = true;
    this.route.params.subscribe(params => { this.id = params['id']; });
  }

  ngOnInit(): void {
    this.checkAuthentication();
  }

  async checkAuthentication(): Promise<void> {
    this.isAuthenticated = await this.authService.canActivate();
    if (this.isAuthenticated) {
      this.getProjectWorkItem();
      this.getWorkGroup();
      this.getProjectStatus();
      this.getComments();
      this.getProjectItemHistory();
      this.getprojectItemWorklog();
      this.getProjectAttchments();
    }
  }

  getProjectWorkItem() {
    this.api.getProjectWorkItem(this.id).subscribe({
      next: (response) => {
        if (response.isError == false) {
          this.workItem = response.responce;
          this.getEmployeeName(this.workItem.assignedEmployeeId ?? '', this.workItem.reportedEmployeeId ?? '');
          // console.log(this.workItem);
        }
        else {
          console.log(response.errorMessage);
        }
      },
      error: (error) => {
        console.log("Error getting project work item: ", error);
      }
    });
  }

  getWorkGroup() {
    // GetworkGroup
    this.api.getAllWorkGroupForProject(this.projectId).subscribe({
      next: (responce) => {
        if (!responce.isError) {
          this.workGroup = responce.responce;
        }
        else {
          console.log(responce.errorMessage);
        }
      },
      error: (error) => {
        console.log("Error fetching project tech: ", error);
      }
    });
  }

  getEmployeeName(assignedEmployeeId: string, reportedEmployeeId: string) {
    this.api.getEmployeeInfo(assignedEmployeeId).subscribe({
      next: (responce) => {
        if (!responce.isError) {
          this.employeeInfo = responce.responce;
          if (this.employeeInfo.lastName != null) {
            this.assignedEmployeeName = this.employeeInfo.firstName + ' ' + this.employeeInfo.lastName;
          } else {
            this.assignedEmployeeName = this.employeeInfo.firstName ?? '';
          }
          //console.log(this.employeeInfo);
        }
        else {
          console.log(responce.errorMessage);
        }
      },
      error: (error) => {
        console.log("Error fetching project tech: ", error);
      }
    });
    this.api.getEmployeeInfo(reportedEmployeeId).subscribe({
      next: (responce) => {
        if (!responce.isError) {
          this.employeeInfo = responce.responce;
          if (this.employeeInfo.lastName != null) {
            this.reportedEmployeeName = this.employeeInfo.firstName + ' ' + this.employeeInfo.lastName;
          } else {
            this.reportedEmployeeName = this.employeeInfo.firstName ?? '';
          }
          //console.log(this.employeeInfo);
        }
        else {
          console.log(responce.errorMessage);
        }
      },
      error: (error) => {
        console.log("Error fetching project tech: ", error);
      }
    });
  }

  getProjectStatus() {
    this.api.getProjectStatusState(this.id).subscribe({
      next: (response) => {
        this.ProjectStatusState = response.responce;
        // console.log(this.ProjectStatusState);
      },
      error: (error) => {
        console.log("Error getting project state: ", error);
      }
    });
  }

  getProjectAttchments() {
    this.api.getProjectWorkAttachments(this.id).subscribe({
      next: (response) => {
        if (response.isError == false) {
          this.ProjectWorkAttchments = response.responce;
          // console.log(this.ProjectWorkAttchments);
        }
        else{
          console.log("Error: ", response.errorMessage);
        }
      },
      error: (error) => {
        console.log("Error getting project state: ", error);
      }
    });
  }

  getProjectItemHistory() {
    this.WorkItemHistoryRequest = {
      workItemId: String(this.id),
      pageNumber: this.currentpage,
      pageSize: this.searchProjectLogForm.value.pageSize ?? this.pageSizes[0],
      expression: this.sortBy,
      isSortByAsc: this.isSortByAsc
    }
    this.api.getWorkItemHistory(this.WorkItemHistoryRequest).subscribe({
      next: (request) => {
        this.WorkItemHistorys = request.responce.workItemHistorys;
        this.workItemHistoryCount = request.responce.totalProjectCount;
        this.pagination();
      },
      error: (error) => {
        console.log('Error getting item history: ', error);
      }
    });
  }

  getprojectItemWorklog() {
    this.api.getProjectWorkId(this.id).subscribe({
      next: (responce) => {
        this.WorkItemLogs = responce.responce;
      },
      error: (error) => {
        console.log("Error getting project item work logs: ", error);
      }
    });
  }

  commentsToggel = false;
  detailsToggel = true;
  descriptionToggel = true;
  attachmentToggel = true;
  stateGraphToggel = true;

  toggelDiv(val: string) {
    if (val === 'comments-toggel') {
      this.commentsToggel = !this.commentsToggel;
    }
    if (val === 'details-head-toggel') {
      this.detailsToggel = !this.detailsToggel;
    }
    if (val === 'description-head-toggel') {
      this.descriptionToggel = !this.descriptionToggel;
    }
    if (val === 'attachment-head-toggel') {
      this.attachmentToggel = !this.attachmentToggel;
    }
    if (val === 'state-graph-toggel') {
      this.stateGraphToggel = !this.stateGraphToggel;
    }
  }

  getWorkGroupName(workgroupId: string): string {
    // console.log(this.workGroup);
    for (let index = 0; index < this.workGroup.length; index++) {
      let element = this.workGroup[index];
      if (String(element.keyId) == workgroupId) {
        // console.log(element.dataValue);
        return element.dataValue;
      }
    }
    return '';
  }

  gotoWorkgroup() {
    this.router.navigate(['project/work-group/' + this.workGroupId]);
  }

  openUpdateWorklogMode() {
    this.WorkLog = {
      projectWorkId: BigInt(this.id),
      title: this.workItem.title ?? '',
      startDate: this.workItem.startDate ?? new Date(),
      endDate: this.workItem.endDate ?? new Date(),
      originalEstTime: this.workItem.originalEstTime ?? 0,
      remainingEstTime: this.workItem.remainingEstTime ?? 0,
      assignedTo: this.assignedEmployeeName,
      workPriority: this.workItem.priority ?? '',
      projectStatusId: this.workItem.projectStatusId ?? 1,
      createdAt: this.workItem.createdAt ?? new Date(),
      totalWorkDone: this.workItem.totalWorkDone ?? 0,
    }
    console.log(this.WorkLog);
    if (this.WorkLog) {
      let workLog = this.WorkLog;
      const dialogRef = this.dialog.open(UpdateWorklogDialogComponent, {
        data: {
          workLog
        },
        position: { top: '20px' }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.alertService.success(result, this.options);
        this.checkAuthentication();
      });
    }
  }

  openUpdateProjectItemWorklogModule(workItemLog: WorkItemLog) {
    console.log(workItemLog);
    workItemLog.title = this.workItem.title;
    let workLog = workItemLog;
    const dialogRef = this.dialog.open(UpdateProjectItemWorklogComponent, {
      data: {
        workLog
      },
      position: { top: '20px' }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.alertService.success(result, this.options);
      this.checkAuthentication();
    });
  }

  saveComment() {
    this.AddCommentsRequest = {
      projectWorkId: String(this.id),
      employeeId: localStorage.getItem('employeeId') ?? '',
      comments: this.addCommentsForm.value.comments ?? ''
    }
    this.api.addWorkItemComments(this.AddCommentsRequest).subscribe({
      next: (responce) => {
        if (responce.isError == false) {
          // alert(responce.responce);
          this.alertService.success(responce.responce, this.options);
          this.checkAuthentication();
        }
      },
      error: (error) => {
        console.log("Error adding comments: ", error);
      }
    });
    this.addCommentsForm.reset();
    this.commentsToggel = false;
  }

  getComments() {
    this.api.getWorkItemComments(this.id).subscribe({
      next: (responce) => {
        if (!responce.isError) {
          this.WorkItemComments = responce.responce;
        }
        else {
          console.log(responce.errorMessage);
        }
      },
      error: (error) => {
        console.log("Error fetching project tech: ", error);
      }
    });
  }

  deleteWorkComment(id: string) {
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      data: {},
      position: { top: '20px' }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result === true) {
        this.api.deleteWorkComment(id).subscribe({
          next: (responce) => {
            if (!responce.isError) {
              this.alertService.success(responce.responce, this.options);
              this.checkAuthentication();
            }
            else {
              console.log(responce.errorMessage);
            }
          },
          error: (error) => {
            console.log("Error fetching deleting workItem Comments: ", error);
          }
        });
      }
    });
  }

  deleteWorkItemLog(id: string) {
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      data: {},
      position: { top: '20px' }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result === true) {
        this.api.deleteWorkItemLog(id).subscribe({
          next: (responce) => {
            if (!responce.isError) {
              this.alertService.success(responce.responce, this.options);
              this.checkAuthentication();
            }
            else {
              console.log(responce.errorMessage);
            }
          },
          error: (error) => {
            console.log("Error fetching deleting workItem Comments: ", error);
          }
        });
      }
    });
  }

  deleteWorkItemAttchment(id: string) {
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      data: {},
      position: { top: '20px' }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result === true) {
        this.api.deleteWorkItemAttachment(id).subscribe({
          next: (responce) => {
            if (!responce.isError) {
              this.alertService.success(responce.responce, this.options);
              this.checkAuthentication();
            }
            else {
              console.log(responce.errorMessage);
            }
          },
          error: (error) => {
            console.log("Error fetching deleting workItem Comments: ", error);
          }
        });
      }
    });
  }

  openAddAttachmentsDialog(id: string) {
    const dialogRef = this.dialog.open(AddAttachmentsComponent, {
      data: {id},
      position: { top: '20px' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.alertService.success(result, this.options);
      }
      this.checkAuthentication();
    });
  }

  editWorkItem() {
    this.router.navigate(['project/update-work-item/' + this.id]);
  }

  updateResponce() {
    this.checkAuthentication();
  }

  formatTime(decimalValue: number): string {
    const hours = Math.floor(decimalValue);
    const minutes = Math.round((decimalValue - hours) * 60);
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }

  // Calculate the total number of pages
  get totalPages(): number {
    return Math.ceil(this.workItemHistoryCount / (this.searchProjectLogForm.value.pageSize ?? 1));
  }

  // Pagination
  get visiblePages(): (number | string)[] {
    const maxVisiblePages = 4;
    const currentPage = this.currentpage;
    const lastPage = this.totalPages;

    if (lastPage <= maxVisiblePages) {
      return Array.from({ length: lastPage }, (_, i) => i + 1);
    }

    const visible = [];
    const start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const end = Math.min(lastPage, start + maxVisiblePages - 1);

    if (start > 1) {
      visible.push('...');
    }

    for (let i = start; i <= end; i++) {
      visible.push(i);
    }

    if (end < lastPage) {
      visible.push('...');
    }

    return visible;
  }
  isPageNumber(item: any): item is number {
    return typeof item === 'number';
  }
  pagination() {
    this.Pages = [];
    for (let index = 0; index < (this.workItemHistoryCount / (this.searchProjectLogForm.value.pageSize ?? 1)); index++) {
      this.Pages.push(index + 1);
    }
  }
  Sort(sortby: string) {
    this.sortBy = sortby;
    this.checkAuthentication();
    this.isSortByAsc = !this.isSortByAsc;
  }
  Previous(currentpage: number) {
    for (let index = (this.Pages.length - 1); index >= 0; index--) {
      let element = this.Pages[index];
      if (element < currentpage) {
        this.currentpage = element;
        this.checkAuthentication();
        return;
      }
    }
  }
  Next(currentpage: number) {
    for (let index = 0; index < this.Pages.length; index++) {
      let element = this.Pages[index];
      if (element > currentpage) {
        this.currentpage = element;
        this.checkAuthentication();
        return;
      }
    }
  }
  // End Of Pagination
}
