import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AttendanceOption } from 'src/app/config/constants';
import { Attendance, getAttendanceRequest, fillAttendance, holiDay } from 'src/app/models/attendance-model';
import { AlertService } from 'src/app/services/alert.service';
import { AttendanceService } from 'src/app/services/attendance.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  allmonths = [
    { name: 'January', key: 1 },
    { name: 'February', key: 2 },
    { name: 'March', key: 3 },
    { name: 'April', key: 4 },
    { name: 'May', key: 5 },
    { name: 'June', key: 6 },
    { name: 'July', key: 7 },
    { name: 'August', key: 8 },
    { name: 'September', key: 9 },
    { name: 'October', key: 10 },
    { name: 'November', key: 11 },
    { name: 'December', key: 12 }
  ]
  isAuthenticated: boolean = false;
  currentMonth = this.allmonths[new Date().getMonth()];
  currentYear = new Date().getFullYear();
  currentDate = new Date();
  attendance: Attendance[] = [];
  attendanceTitle = 'Attendance';
  attendanceApproved = false;
  AttendanceOption: typeof AttendanceOption = AttendanceOption;
  holidayList: holiDay[] = [];
  todaysAttendance = "";
  totalPresent = 0;
  totalAbsent = 0;
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  
  ngOnInit(): void {
    this.attendanceTitle = this.currentMonth.name + ' - ' + this.currentYear;
    this.checkAuthentication();
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private api: AttendanceService,
    protected alertService: AlertService
  ) { }

  searchAttendanceForm = this.formBuilder.group({
    month: [this.formBuilder.control(this.currentMonth.key)],
    year: [this.formBuilder.control(this.currentYear)]
  });
  async checkAuthentication(): Promise<void> {
    this.isAuthenticated = await this.authService.canActivate();
    if (this.isAuthenticated) {
      this.resetAttendance();
      this.searchAttendance();
    }
  }
  searchAttendance() {
    if (this.searchAttendanceForm.value.month != null && this.searchAttendanceForm.value.year != null) {
      this.attendanceTitle = this.allmonths[(this.searchAttendanceForm.value.month) - 1].name + ' - ' + (this.searchAttendanceForm.value.year ?? this.currentYear);
    }
    var id = localStorage.getItem('employeeId');
    if (id != null) {
      var request: getAttendanceRequest = {
        employeeId: id,
        month: this.searchAttendanceForm.value.month ?? null,
        year: this.searchAttendanceForm.value.year ?? null
      }
      this.api.getAttendance(request).subscribe({
        next: (reponse) => {
          this.totalPresent = 0;
          this.totalAbsent = 0;
          this.attendance = reponse.responce;
          for (let index = 0; index < this.attendance.length; index++) {
            let element = this.attendance[index];
            if (element.currentDate != null) {
              let currentDate = new Date();
              let elementDate = new Date(element.currentDate);
              if (elementDate.getDate() === currentDate.getDate() && elementDate.getMonth() === currentDate.getMonth() && elementDate.getFullYear() === currentDate.getFullYear()) {
                this.todaysAttendance = AttendanceOption[(element.attendanceOption ?? 4) - 1];
                this.attendanceApproved = element.isApproved ?? false;
                // console.log(this.todaysAttendance);
              }
              if (element.attendanceOption == 1) {
                this.totalPresent++;
              } else if (element.attendanceOption == 2) {
                this.totalAbsent++;
              }
            }
          }
        },
        error: (error) => {
          console.log("Error getting attendance: ", error);
        }
      });
      this.api.getHoliday().subscribe({
        next: (response) => {
          this.holidayList = response.responce;
          // console.log(this.holidayList);
        },
        error: (error) => {
          console.log("Error getting holidayList: ", error);
        }
      });
    }
  }

  resetAttendance() {
    this.searchAttendanceForm.patchValue({ month: this.currentMonth.key, year: this.currentYear });
  }

  updateAttendance(option: number) {
    this.todaysAttendance = AttendanceOption[option - 1];
  }

  addAttendance() {
    this.checkAuthentication();
    var attendance = 0;
    var id = localStorage.getItem('employeeId');
    if (id != null) {
      if (this.todaysAttendance == "P") {
        attendance = 1;
      }
      else if (this.todaysAttendance == "A") {
        attendance = 2;
      }
      else if (this.todaysAttendance == "H") {
        attendance = 3;
      }
      if (attendance != 0) {
        var request: fillAttendance = {
          employeeId: id,
          attendanceOption: attendance
        }
        this.api.addAttendance(request).subscribe({
          next: (response) => {
            // alert(response.responce);
            this.alertService.success(response.responce, this.options)
            this.checkAuthentication();
            // console.log(response);
          },
          error: (error) => {
            console.log("Error getting attendance: ", error);
          }
        });
      }
    }
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
      // console.log(formattedDate);
      // return Object.values(holidayList).includes(formattedDate); <= for enum
    }
    return false;
  }
}