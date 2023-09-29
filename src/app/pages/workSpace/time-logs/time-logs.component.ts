import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/app/config/constants';
import { employeeInfo, employeeMonthlyLog, employeeYearlyLog, getMyMonthlyTimeLogRequest, getMyYearlyTimeLogRequest, timelogHover } from 'src/app/models/timelogs-model';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { TimelogsService } from 'src/app/services/timelogs.service';

@Component({
  selector: 'app-time-logs',
  templateUrl: './time-logs.component.html',
  styleUrls: ['./time-logs.component.css']
})
export class TimeLogsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private userApi: DashboardService,
    private api: TimelogsService,
    private dialog: MatDialog,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) {
    environment.showProject = true;
  }

  ngOnInit(): void {
    this.checkAuthentication();
  }

  isAuthenticated: boolean = false;
  projectResponce = 'monthly';
  employeeId: string = localStorage.getItem('employeeId') ?? '';
  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  currentMonth: number = new Date().getFullYear();
  searchProjectLogForm = this.formBuilder.group({
    type: new FormControl<string>('monthly'),
    month: new FormControl<number>(new Date().getMonth()),
    year: new FormControl<number>(new Date().getFullYear())
  });
  monthlyRequest: getMyMonthlyTimeLogRequest = {
    employeeId: this.employeeId,
    month: (this.searchProjectLogForm.value.month != null) ? (this.searchProjectLogForm.value.month + 1) : null,
    year: this.searchProjectLogForm.value.year ?? null
  }
  yearlyRequest: getMyYearlyTimeLogRequest = {
    employeeId: this.employeeId,
    year: this.searchProjectLogForm.value.year ?? null
  }
  employeeInfo: employeeInfo | null = {
    employeeNo: '',
    name: '',
    shift: '',
    experience: 0,
    hours: 0,
    presentDays: 0,
    leaveDays: 0,
    halfLeave: 0,
    lateDays: 0,
    avgTimeLog: 0,
    avgWorkLog: 0,
    difference: 0,
    outHours: 0
  }
  employeeMonthlyLogs: employeeMonthlyLog[] = [];
  employeeYearlyLog: employeeYearlyLog[] = [];
  timelogHover: timelogHover[] = [];

  async checkAuthentication(): Promise<void> {
    this.isAuthenticated = await this.authService.canActivate();
    if (this.isAuthenticated) {
      this.getMyTimelogs();
    }
  }
  getMyTimelogs() {
    if (this.searchProjectLogForm.value.type == 'monthly') {
      this.monthlyRequest = {
        employeeId: this.employeeId,
        month: (this.searchProjectLogForm.value.month != null) ? (this.searchProjectLogForm.value.month + 1) : null,
        year: this.searchProjectLogForm.value.year ?? null
      }
      this.employeeMonthlyLogs = [];
      this.timelogHover = [];
      this.employeeInfo = null;
      this.api.getMyMonthlyTimeLog(this.monthlyRequest).subscribe({
        next: (responce) => {
          if (responce.isError == false) {
            this.employeeInfo = responce.responce.employeeInfo;
            var temp: employeeMonthlyLog[] = [];
            var tempDate = '';
            temp = responce.responce.employeeMonthlyLogs;
            for (let i = 0; i < temp.length; i++) {
              let element = temp[i];
              if (tempDate == element.date) {
                this.employeeMonthlyLogs.pop();
                var tempEntry: employeeMonthlyLog = {
                  date: temp[i].date,
                  lateComer: temp[i - 1].lateComer,
                  firstInTime: temp[i - 1].firstInTime,
                  lastOutTime: temp[i].lastOutTime,
                  totalOutHours: (temp[i].firstInTime - temp[i - 1].lastOutTime),
                  workLog: temp[i].workLog
                }
                this.employeeMonthlyLogs.push(tempEntry);
                // Adding data in time log hover table
                this.timelogHover.pop();
                var temptimelogHover1: timelogHover = {
                  date: temp[i - 1].date,
                  timein: temp[i - 1].firstInTime,
                  timeout: temp[i - 1].lastOutTime,
                  outHrs: temp[i].firstInTime - temp[i - 1].lastOutTime,
                  workHrs: temp[i - 1].lastOutTime - temp[i - 1].firstInTime
                }
                var temptimelogHover2: timelogHover = {
                  date: temp[i].date,
                  timein: temp[i].firstInTime,
                  timeout: temp[i].lastOutTime,
                  outHrs: 0,
                  workHrs: temp[i].lastOutTime - temp[i].firstInTime
                }
                this.timelogHover.push(temptimelogHover1);
                this.timelogHover.push(temptimelogHover2);
              }
              else {
                this.employeeMonthlyLogs.push(temp[i]);
                // Adding data in time log hover table
                var temptimelogHover: timelogHover = {
                  date: temp[i].date,
                  timein: temp[i].firstInTime,
                  timeout: temp[i].lastOutTime,
                  outHrs: 0,
                  workHrs: temp[i].lastOutTime - temp[i].firstInTime
                }
                this.timelogHover.push(temptimelogHover);
              }
              tempDate = element.date;
            }
            // console.log(this.getHoverTable('26-09-2023 [Tuesday]'));
            // console.log(this.employeeInfo, this.employeeMonthlyLogs);
          }
          else {
            console.log("Error: ", responce.errorMessage);
          }
        },
        error: (error) => {
          console.log("Error getting Mothly Time log: ", error);
        }
      });
    }
    if (this.searchProjectLogForm.value.type == 'yearly') {
      this.employeeYearlyLog = [];
      this.yearlyRequest = {
        employeeId: this.employeeId,
        year: this.searchProjectLogForm.value.year ?? null
      }
      this.api.getMyYearlyTimeLog(this.yearlyRequest).subscribe({
        next: (responce) => {
          if (responce.isError == false) {
            this.employeeYearlyLog = responce.responce;
            console.log(this.employeeYearlyLog);
          }
          else {
            console.log("Error: ", responce.errorMessage);
          }
        },
        error: (error) => {
          console.log("Error getting Yearly Time log: ", error);
        }
      });
    }

  }
  resetForm() {
    // this.searchProjectLogForm.reset();
    this.searchProjectLogForm.patchValue({
      type: 'monthly',
      month: new Date().getMonth(),
      year: new Date().getFullYear()
    });
  }
  updateResponce() {
    this.checkAuthentication();
    this.projectResponce = this.searchProjectLogForm.value.type ?? 'monthly';
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
}
