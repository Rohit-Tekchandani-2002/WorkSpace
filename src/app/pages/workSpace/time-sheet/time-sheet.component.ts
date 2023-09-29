import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { SlideInOutAnimation } from 'src/app/animation';
import { UpdateWorklogDialogComponent } from 'src/app/components/update-worklog-dialog/update-worklog-dialog.component';
import { holiDay } from 'src/app/models/attendance-model';
import { WorkLog, employeeInfo, workItem } from 'src/app/models/project-model';
import { LogDateItem, TimeSheet, WorkDoneItem, getTimeSheetRequest } from 'src/app/models/timesheet.model';
import { AlertService } from 'src/app/services/alert.service';
import { AttendanceService } from 'src/app/services/attendance.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { TimesheetService } from 'src/app/services/timesheet.service';

@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.css'],
  animations: [SlideInOutAnimation]
})
export class TimeSheetComponent {
  response: any;
  isAuthenticated: boolean = false;
  employeeId: string = localStorage.getItem('employeeId') ?? '';
  getTimeSheetRequest: getTimeSheetRequest = {
    employeeId: this.employeeId,
    month: null,
    year: null
  }
  totalWork: number = 0;
  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  holidayList: holiDay[] = [];
  TimeSheet: TimeSheet[] = [];
  workList: WorkDoneItem[] = [];
  timeList: LogDateItem[] = [];
  weeklyTimeList: WorkDoneItem[] = [];
  DateTimeNow = new Date();
  currentDate = new Date();
  currentMonthName = this.monthNames[this.currentDate.getMonth()];
  currentMonth = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();
  projectList: string[] = [];
  assignedEmployeeName = '';
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
    projectWorkId: BigInt(0),
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
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  employeeInfo: employeeInfo = {
    profileImage: null,
    firstName: null,
    lastName: null
  };
  public loading$ = new BehaviorSubject<boolean>(false);
  constructor(
    private authService: AuthenticationService,
    private api: TimesheetService,
    private projectApi: ProjectsService,
    private attendancApi: AttendanceService,
    private dialog: MatDialog,
    private alertService: AlertService
  ) { }
  ngOnInit(): void {
    this.checkAuthentication();
  }

  async checkAuthentication(): Promise<void> {
    this.isAuthenticated = await this.authService.canActivate();
    if (this.isAuthenticated) {
      this.filltimeSheet();
      this.getTimeSheet();
      this.getHoliday();
    }
  }

  filltimeSheet() {
    this.TimeSheet = [];
    for (let index = 1; index <= (new Date(this.currentYear, this.currentMonth + 1, 0)).getDate(); index++) {
      let tempDate = new Date(this.currentYear, this.currentMonth, index);
      let timesheet: TimeSheet = {
        currentDate: tempDate,
        currentWeekDay: this.days[tempDate.getDay()].charAt(0)
      };
      this.TimeSheet.push(timesheet)
    }
  }
  getTimeSheet() {
    this.getTimeSheetRequest = {
      employeeId: this.employeeId,
      month: this.currentMonth + 1,
      year: this.currentYear
    }
    this.projectList = [];
    this.totalWork = 0;
    this.loading$.next(true);
    this.api.getTimeSheet(this.getTimeSheetRequest).subscribe({
      next: (response) => {
        if (response.isError == false) {
          this.response = response.responce;
          console.log(this.response);
          for (let index = 0; index < response.responce.length; index++) {
            let element = response.responce[index];
            this.totalWork = this.totalWork + element.TotalWorkLog;
            if (!this.projectList.includes(element.ProjectName)) {
              this.projectList.push(element.ProjectName);
            }
          }
        }
        else if (response.isError == true) {
          console.log(response.errorMessage);
        }
      },
      error: (error) => {
        console.log("Error gerring timesheet: ", error);
      },
      complete: () => {
        this.loading$.next(false);
      }
    });
    this.api.getMonthlyTimeSheet(this.getTimeSheetRequest).subscribe({
      next: (response) => {
        if (response.isError == false) {
          this.workList = response.responce.workList;
          this.timeList = response.responce.timeList;
          var temp: WorkDoneItem = {
            workDoneOn: new Date(),
            workTime: 0
          }
          var templog = 0;
          this.weeklyTimeList = [];
          for (let index = 0; index < this.TimeSheet.length; index++) {
            let res = this.TimeSheet[index];
            for (let i = 0; i < this.workList.length; i++) {
              let element = this.workList[i];
              if (
                (res.currentDate?.toDateString() === new Date(element.workDoneOn).toDateString()) &&
                (res.currentDate.getDay() !== 6 &&
                  (
                    res.currentDate.getDay() === 0 || res.currentDate.getDay() === 1 ||
                    res.currentDate.getDay() === 2 || res.currentDate.getDay() === 3 ||
                    res.currentDate.getDay() === 4 || res.currentDate.getDay() === 5
                  ))) {
                templog = templog + element.workTime;
              }
              else if (res.currentDate?.getDay() === 6 && temp.workDoneOn !== res.currentDate) {
                temp = {
                  workDoneOn: res.currentDate,
                  workTime: templog
                }
                if (!this.weeklyTimeList.includes(temp)) {
                  this.weeklyTimeList.push(temp);
                }
                templog = 0;
              }
            }
          }
        }
        else if (response.isError == true) {
          console.log(response.errorMessage);
        }
      },
      error: (error) => {
        console.log("Error gerring timesheet: ", error);
      },
      complete: () => {
        this.loading$.next(false);
      }
    });
  }
  isDate(key: string): boolean {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(key);
  }
  formatTime(decimalValue: number | null): string | null {
    if (decimalValue != null) {
      const hours = Math.floor(decimalValue);
      const minutes = Math.round((decimalValue - hours) * 60);
      return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    }
    else {
      return null;
    }
  }
  subtractOneMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.currentMonthName = this.monthNames[this.currentDate.getMonth()];
    this.currentYear = this.currentDate.getFullYear();
    this.currentMonth = this.currentDate.getMonth();
    this.checkAuthentication();
  }
  addOneMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.currentMonthName = this.monthNames[this.currentDate.getMonth()];
    this.currentYear = this.currentDate.getFullYear();
    this.currentMonth = this.currentDate.getMonth();
    this.checkAuthentication();
  }
  getHoliday() {
    this.loading$.next(true);
    this.attendancApi.getHoliday().subscribe({
      next: (response) => {
        this.holidayList = response.responce;
        // console.log(this.holidayList);
      },
      error: (error) => {
        console.log("Error getting holidayList: ", error);
      },
      complete: () => {
        this.loading$.next(false);
      }
    });
  }
  isholyday(date: Date | null): boolean {
    if (date !== null) {
      const attendanceDate = new Date(date);
      const formattedDate = attendanceDate.toLocaleDateString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' });
      for (let index = 0; index < this.holidayList.length; index++) {
        let element = new Date(this.holidayList[index].value).toLocaleDateString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' });
        if (element === formattedDate) {
          return true;
        }
      }
    }
    return false;
  }
  getProjectId(title: string): string {
    return title.split(':')[0];
  }
  IsgivenDateIsSmallerThenCurrentDate(date: Date | null): boolean {
    if (date != null) {
      if ((date < this.DateTimeNow)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  IsEditAllowed(date: Date | null): boolean {
    var tempdate = new Date();
    tempdate.setDate(this.DateTimeNow.getDate() - 5);
    if (date != null) {
      if ((date < this.DateTimeNow) && (date > tempdate)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  OpenEditWorkLog(id: string, workDoneOn: Date | null) {
    this.loading$.next(true);
    this.projectApi.getProjectWorkItem(id).subscribe({
      next: (response) => {
        if (response.isError == false) {
          this.workItem = response.responce;
          if (workDoneOn != null) {
            this.getEmployeeNameAndOpenEditor(this.workItem.assignedEmployeeId ?? '', id ?? '', workDoneOn);
          }else{
            this.loading$.next(false);
          }
        }
        else {
          console.log(response.errorMessage);
          this.loading$.next(false);
        }
      },
      error: (error) => {
        console.log("Error getting project work item: ", error);
        this.loading$.next(false);
      }
    });
  }

  getEmployeeNameAndOpenEditor(assignedEmployeeId: string, id: string, workDoneOn: Date | null) {
    this.projectApi.getEmployeeInfo(assignedEmployeeId).subscribe({
      next: (responce) => {
        if (!responce.isError) {
          this.employeeInfo = responce.responce;
          if (this.employeeInfo.lastName != null) {
            this.assignedEmployeeName = this.employeeInfo.firstName + ' ' + this.employeeInfo.lastName;
          } else {
            this.assignedEmployeeName = this.employeeInfo.firstName ?? '';
          }
          this.WorkLog = {
            projectWorkId: BigInt(id),
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
          this.loading$.next(false);
          if (this.WorkLog) {
            let workLog = this.WorkLog;
            const dialogRef = this.dialog.open(UpdateWorklogDialogComponent, {
              data: {
                workLog,
                workDoneOn
              },
              position: { top: '20px' }
            });
            dialogRef.afterClosed().subscribe(result => {
              this.checkAuthentication();
              this.alertService.success(result, this.options);
            });
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
}
