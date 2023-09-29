import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SlideInOutAnimation } from 'src/app/animation';
import { UndoDialogComponent } from 'src/app/components/undo-dialog/undo-dialog.component';
import { UpdateWorklogDialogComponent } from 'src/app/components/update-worklog-dialog/update-worklog-dialog.component';
import { ProjectStatus, WorkFlowType, environment } from 'src/app/config/constants';
import { userNameResponce } from 'src/app/models/dashboard-model';
import { DropDownResponce, TeamRosTerResponce, WorkGroup, WorkLog, getWorkRequest, updateWorkLogStatusRequest } from 'src/app/models/project-model';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-work-backlog',
  templateUrl: './work-backlog.component.html',
  styleUrls: ['./work-backlog.component.css'],
  animations: [SlideInOutAnimation]
})
export class WorkBacklogComponent implements OnInit {
  id = '0';
  groupBy = 'none';
  viewType = 'dashboard';
  searchFilter = false;
  isAuthenticated: boolean = false;
  userInfo: userNameResponce | null = null;
  WorkGroup: WorkGroup = {
    workGroupId: 0n,
    title: '',
    startDate: null,
    endDate: null
  };
  WorkLogs: WorkLog[] = [];
  workFlowType: typeof WorkFlowType = WorkFlowType;
  projectStatus: typeof ProjectStatus = ProjectStatus;
  workGroup: DropDownResponce[] = [];
  updateWorkLogStatusRequest: updateWorkLogStatusRequest = {
    projectStatusId: 0,
    projectWorkId: '',
    StartDate: null,
    endDate: null,
    employeeId: null,
    projectId: null,
    subProjectId: null,
    title: null,
    workGroupId: null,
    workFlow: null,
    priority: null,
    originalEstTime: null,
    remainingEstTime: null,
    assignedEmployeeId: null,
    reportedEmployeeId: null,
    releasedToProduction: null,
    rsi: null,
    description: null
  }
  sortBy: string = 'ProjectWorkId';
  isSortByAsc: boolean = true;
  getWorkRequest: getWorkRequest = {
    workGroupId: this.id,
    searchText: null,
    projectType: null,
    projectStatus: null,
    assignedPersonId: null,
    expression: this.sortBy,
    isSortByAsc: this.isSortByAsc
  }
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  employeeId = localStorage.getItem('employeeId');
  projectId = localStorage.getItem('ProjectId');
  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private userApi: DashboardService,
    private api: ProjectsService,
    private dialog: MatDialog,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) {
    environment.showProject = true;
    this.route.params.subscribe(params => { this.id = params['id']; localStorage.setItem('workGroupId', params['id']); });
    localStorage.setItem('workGroupId', String(this.id));
  }

  public loading$ = new BehaviorSubject<boolean>(false);
  
  async refershWithLoading(num: number){
    this.loading$.next(true);
    await new Promise(f => setTimeout(f, num));
    this.checkAuthentication();
    this.loading$.next(false);
  }

  workLogForm = this.formBuilder.group({
    workGroupId: new FormControl<string>(this.id),
    searchText: new FormControl<string | null>(null),
    projectType: [[null]],
    projectStatus: [[null]]
  });

  WorkGroupLogId = this.workLogForm.value.workGroupId ?? this.id;

  ngOnInit(): void {
    this.checkAuthentication();
  }

  async checkAuthentication(): Promise<void> {
    this.isAuthenticated = await this.authService.canActivate();
    if (this.isAuthenticated) {
      this.getUserInfo();
      this.getWorkGroup();
      this.getWorkLog();
      this.getWorkGroupList();
    }
  }
  getUserInfo() {
    // GetEmployee In Header
    this.userApi.employeeInfo(this.employeeId).subscribe({
      next: (response) => {
        if (!response.isError) {
          this.userInfo = response.responce;
          // console.log(response);
        }
        else {
          alert("Error: " + response.responce.errorMessage);
        }
      },
      error: (error) => {
        console.log('Error fetching user information:', error);
      }
    });
  }
  getWorkGroup() {
    if (this.id != '0') {
      this.api.getWorkGroupFromId(this.id).subscribe({
        next: (response) => {
          if (response.isError != true) {
            this.WorkGroup = response.responce;
            // console.log(this.WorkGroup);
          }
          else {
            console.log(response.errorMessage);
          }
        },
        error: (error) => {
          console.log("Error getting workGroup: ", error);
        }
      });
    }
  }
  searchLog(){
    this.WorkGroupLogId = this.workLogForm.value.workGroupId ?? this.id;
    this.checkAuthentication();
  }
  statusClosed: WorkLog[] = [];
  sattusDevCompleted: WorkLog[] = [];
  statusInProgress: WorkLog[] = [];
  statusNew: WorkLog[] = [];
  statusReadyforTesting: WorkLog[] = [];
  getWorkLog() {
    if (this.id != '0') {
      this.getWorkRequest = {
        workGroupId: this.id,
        searchText: this.workLogForm.value.searchText ?? null,
        projectType: (this.workLogForm.value.projectType != null) ? this.workLogForm.value.projectType.filter(value => value !== null && value !== '').map(value => String(Number(value) + 1)).join(',') : '',
        projectStatus: (this.workLogForm.value.projectStatus != null) ? this.workLogForm.value.projectStatus.filter(value => value !== null && value !== '').map(value => String(Number(value) + 1)).join(',') : '',
        assignedPersonId: this.employeeId,
        expression: this.sortBy,
        isSortByAsc: this.isSortByAsc
      }
      console.log(this.getWorkRequest);
      this.api.getWorkLogFromId(this.getWorkRequest).subscribe({
        next: (response) => {
          if (response.isError != true) {
            this.WorkLogs = response.responce;
            this.statusClosed = [];
            this.sattusDevCompleted = [];
            this.statusInProgress = [];
            this.statusNew = [];
            this.statusReadyforTesting = [];
            for (let index = 0; index < this.WorkLogs.length; index++) {
              let element = this.WorkLogs[index];
              if (element.projectStatusId == 1) {
                this.statusNew.push(element);
              }
              else if (element.projectStatusId == 2) {
                this.statusInProgress.push(element);
              }
              else if (element.projectStatusId == 3) {
                this.sattusDevCompleted.push(element);
              }
              else if (element.projectStatusId == 4) {
                this.statusReadyforTesting.push(element);
              }
              else if (element.projectStatusId == 5) {
                this.statusClosed.push(element);
              }
            }
          }
          else {
            console.log(response.errorMessage);
          }
        },
        error: (error) => {
          console.log("Error getting workLogs: ", error);
        }
      });
    }
  }
  drop(event: CdkDragDrop<WorkLog[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.updateWorkLogStatus(event.container.id, event.item.element.nativeElement.id);
    }

  }
  getProgressWidth(orignalTime: number, remaningTime: number): object {
    var num = 0;
    num = ((orignalTime - remaningTime) * 100) / orignalTime;
    return { 'width': num + '%' };
  }
  updateWorkLogStatus(destination: string, id: string) {
    const timeout = 3000;
    const dialogRef = this.dialog.open(UndoDialogComponent, {
      data: {},
      position: { top: '20px' }
    });
    dialogRef.afterOpened().subscribe(() => {
      setTimeout(() => {
        dialogRef.close(false);
      }, timeout)
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result === false) {
        var tempStatus = 0;

        if (destination === "cdk-drop-list-0") { tempStatus = 1; }
        else if (destination === "cdk-drop-list-1") { tempStatus = 2; }
        else if (destination === "cdk-drop-list-2") { tempStatus = 3; }
        else if (destination === "cdk-drop-list-3") { tempStatus = 4; }
        else if (destination === "cdk-drop-list-4") { tempStatus = 5; }

        if (tempStatus != 0 && id != '') {
          this.updateWorkLogStatusRequest = {
            projectStatusId: tempStatus,
            projectWorkId: id,
            StartDate: null,
            endDate: null,
            employeeId: null,
            projectId: null,
            subProjectId: null,
            title: null,
            workGroupId: null,
            workFlow: null,
            priority: null,
            originalEstTime: null,
            remainingEstTime: null,
            assignedEmployeeId: null,
            reportedEmployeeId: null,
            releasedToProduction: null,
            rsi: null,
            description: null
          }
          console.log(this.updateWorkLogStatusRequest);
          this.api.updateWorkLog(this.updateWorkLogStatusRequest).subscribe({
            next: (request) => {
              this.checkAuthentication();
              this.alertService.success(request.responce, this.options);
            },
            error: (error) => {
              console.log("Error updating worklog status: ", error);
            }
          });
        }
      }
      this.checkAuthentication();
    });
  }
  getWorkGroupList() {
    this.api.getAllWorkGroupForProject(this.projectId).subscribe({
      next: (responce) => {
        if (!responce.isError) {
          this.workGroup = responce.responce;
          if (this.workLogForm.value.workGroupId === '0') {
            this.workLogForm.patchValue({ workGroupId: this.workGroup[0].keyId });
          }
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
  formatTime(decimalValue: number): string {
    const hours = Math.floor(decimalValue);
    const minutes = Math.round((decimalValue - hours) * 60);
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }
  openUpdateWorklogMode(worklog: WorkLog) {
    // console.log(worklog);
    if (worklog) {
      let workLog = worklog;
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
  GroupBy(val: string) {
    this.groupBy = val;
  }
  ViewType(val: string) {
    this.viewType = val;
    if (this.groupBy != 'none' && this.groupBy != 'assignedTo' && this.viewType == 'dashboard') {
      this.groupBy = 'none';
    }
  }

  assignedLogToggel = true;
  unassignedLogToggel = true;
  toggelDiv(val: string) {
    if (val === 'assigned-toggel') {
      this.assignedLogToggel = !this.assignedLogToggel;
    }
    if (val === 'unassigned-toggel') {
      this.unassignedLogToggel = !this.unassignedLogToggel;
    }
  }

  // Multi Select
  allSelectedProjectType = false;
  allSelectedProjectStatus = false;

  @ViewChild('multiSelectProjectType') multiSelectProjectType!: MatSelect;
  @ViewChild('multiSelectProjectStatus') multiSelectProjectStatus!: MatSelect;

  toggleAllSelectionProjectType() {
    this.allSelectedProjectType = !this.allSelectedProjectType;  // to control select-unselect

    if (this.allSelectedProjectType) {
      this.multiSelectProjectType.options.forEach((item: MatOption) => { (item.value != null) ? item.select() : item.deselect() });
    } else {
      this.multiSelectProjectType.options.forEach((item: MatOption) => { item.deselect() });
    }
    this.multiSelectProjectType.close();
  }
  toggleAllSelectionProjectStatus() {
    this.allSelectedProjectStatus = !this.allSelectedProjectStatus;  // to control select-unselect

    if (this.allSelectedProjectStatus) {
      this.multiSelectProjectStatus.options.forEach((item: MatOption) => { (item.value != null) ? item.select() : item.deselect() });
    } else {
      this.multiSelectProjectStatus.options.forEach((item: MatOption) => { item.deselect() });
    }
    this.multiSelectProjectStatus.close();
  }
  //End Of Multi Select
  resetForm() {
    this.workLogForm.reset();
    this.workLogForm.patchValue({ workGroupId: this.workGroup[0].keyId });
  }
  Sort(sortby: string) {
    this.sortBy = sortby;
    this.checkAuthentication();
    this.isSortByAsc = !this.isSortByAsc;
  }
  groupByKey(inputList: any[], inputKey: string | number, itemKey: string | null) : {key: string[], value: any, workDone: number, remaningTime: number, percentage: number}{
    const groupByKey = (list: any[], key: string | number) => list.reduce((hash, obj) => ({ ...hash, [obj[key]]: (hash[obj[key]] || []).concat(obj) }), {});
    var temp = groupByKey(inputList, inputKey);
    const keys: string[] = Object.keys(temp);
    var totalWorkDone = 0;
    var remaningTime = 0;
    var percentage = 0;
    if (keys.length > 0) {
      for (let index = 0; index < keys.length; index++) {
        let element = temp[keys[index]];
        if (itemKey != null) {
          if (element.length > 0 && keys[index] === itemKey) {
            for (let j = 0; j < element.length; j++) {
              totalWorkDone += element[j].totalWorkDone;
              remaningTime += element[j].remainingEstTime;
            }
          }
        }
      }
    }
    percentage = Math.round((totalWorkDone/(totalWorkDone+remaningTime)) * 100);
    return {key: keys, value: temp, workDone: totalWorkDone, remaningTime: remaningTime, percentage: percentage};
  }
}