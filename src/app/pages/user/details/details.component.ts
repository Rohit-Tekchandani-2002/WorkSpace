import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { changePasswordRequest, employeeDetailsResponce, notificaiotnRequest } from 'src/app/models/user-details-model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  
  isAuthenticated: boolean = false;
  employeeDetails: employeeDetailsResponce | null = null;
  designationchar: string = '';
  changePasswordForm!: FormGroup;
  
  ngOnInit(): void {
    this.checkAuthentication();
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator.bind(this)
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private api: UserDetailsService
  ) { }
  
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (newPassword !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }

  changePasswordRequest: changePasswordRequest = {
    employeeId: Number(localStorage.getItem('employeeId') ?? '0'),
    newpassword: '',
    oldpassword: ''
  }

  notificaiotnRequest: notificaiotnRequest = {
    employeeId: Number(localStorage.getItem('employeeId') ?? '0'),
    notificationTypeResolutionChanged: [this.employeeDetails?.notificationTypeResolutionChanged] ? true : false,
    notificationOnAssignedWorkItemChangeByTeamMember: [this.employeeDetails?.notificationOnAssignedWorkItemChangeByTeamMember] ? true : false,
    notificationCommnetOnWork: [this.employeeDetails?.notificationCommnetOnWork] ? true : false,
    notificationAssignedWork: [this.employeeDetails?.notificationAssignedWork] ? true : false,
    notificationDailyAlertEmail: [this.employeeDetails?.notificationDailyAlertEmail] ? true : false,
    notificationOnCreatedWorkItemChangeByTeamMember: [this.employeeDetails?.notificationOnCreatedWorkItemChangeByTeamMember] ? true : false
  };

  async checkAuthentication(): Promise<void> {
    this.isAuthenticated = await this.authService.canActivate();
    const id = localStorage.getItem('employeeId');
    if (this.isAuthenticated && id != null) {
      // Get Employee Details
      this.api.getEmployeeDetails(id).subscribe({
        next: (responce) => {
          // console.log(responce);
          if (!responce.isError) {
            this.employeeDetails = responce.responce;
            this.designationchar = responce.responce.designation.charAt(0);
            // getting notification setting 
            this.notificaiotnRequest = {
              employeeId: Number(localStorage.getItem('employeeId') ?? '0'),
              notificationTypeResolutionChanged: this.employeeDetails?.notificationTypeResolutionChanged ? true : false,
              notificationOnAssignedWorkItemChangeByTeamMember: this.employeeDetails?.notificationOnAssignedWorkItemChangeByTeamMember ? true : false,
              notificationCommnetOnWork: this.employeeDetails?.notificationCommnetOnWork ? true : false,
              notificationAssignedWork: this.employeeDetails?.notificationAssignedWork ? true : false,
              notificationDailyAlertEmail: this.employeeDetails?.notificationDailyAlertEmail ? true : false,
              notificationOnCreatedWorkItemChangeByTeamMember: this.employeeDetails?.notificationOnCreatedWorkItemChangeByTeamMember ? true : false
            };
            // console.log(this.employeeDetails);
            // console.log(this.notificaiotnRequest);
          }
          else {
            console.log(responce.errorMessage);
          }
        },
        error: (error) => {
          console.log("Error fetching employee details: ", error);
        }
      });
    }
  }
  async onChangePasswordSubmit() {
    this.isAuthenticated = await this.authService.canActivate();
    const id = localStorage.getItem('employeeId');
    this.changePasswordRequest.newpassword = this.changePasswordForm.value.newPassword;
    this.changePasswordRequest.oldpassword = this.changePasswordForm.value.currentPassword;
    if (this.isAuthenticated && id != null) {
      this.api.changePassword(this.changePasswordRequest).subscribe({
        next: (responce) => {
          if (!responce.isError) {
            alert(responce.responce);
            this.changePasswordForm.reset();
          }
        },
        error: (error) => {
          console.log("Error changing employee password: ", error);
          alert("Something went worng, please try again!");
        }
      });
    }
    else {
      alert('Something went worng while changing password, Please try again!');
    }
  }
  async notificationFormSubmit() {
    this.isAuthenticated = await this.authService.canActivate();
    const id = localStorage.getItem('employeeId');

    if (this.isAuthenticated && id != null) {
      this.api.chageNotificationSetting(this.notificaiotnRequest).subscribe({
        next: (responce) => {
          if (!responce.isError) {
            alert(responce.responce);
            this.checkAuthentication();
          }
        },
        error: (error) => {
          console.log("Error changing notification setting: ", error);
          alert("Something went worng, please try again!");
        }
      });
    }
    else {
      alert('Something went worng while changing notificaiton setting, Please try again!');
    }
  }
}
