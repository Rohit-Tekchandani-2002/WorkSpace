import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { WorkLog, addWorkLogRequest, updateProjectWorkItemRequest } from 'src/app/models/project-model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-update-worklog-dialog',
  templateUrl: './update-worklog-dialog.component.html',
  styleUrls: ['./update-worklog-dialog.component.css']
})
export class UpdateWorklogDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { workLog: WorkLog, workDoneOn: Date | null },
    private dialogRef: MatDialogRef<UpdateWorklogDialogComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private api: ProjectsService
  ) { }
  ngOnInit(): void {
    this.checkAuthentication();
  }
  updateWorkLogForm = this.formBuilder.group({
    workDoneOn: [ this.data.workDoneOn ?? new Date()],
    workTimeHours: [0],
    workTimeMinutes: [0],
    description: [null],
    updateRemainingEst: [false],
    remainingEstHours: [{ value: 0, disabled: true }],
    remainingEstMinutes: [{ value: 0, disabled: true }]
  });
  addWorkLogRequest: addWorkLogRequest = {
    projectWorkId: '0',
    workDoneOn: this.data.workDoneOn ?? new Date(),
    workTime: 0,
    description: null
  }
  updateProjectWorkItemRequest: updateProjectWorkItemRequest = {
    projectWorkId: '0',
    totalTime: 0,
    remaningTime: 0
  }
  workdoneOn: number = 0;
  remaningEstTimeValue: number | null = null;
  isAuthenticated: boolean = false;
  responce = '';
  public loading$ = new BehaviorSubject<boolean>(false);
  async checkAuthentication(): Promise<void> {
    this.isAuthenticated = await this.authService.canActivate();
    if (this.isAuthenticated) {
      this.remaningDisable();
    }
  }
  private getNowUTC(datevar: Date) {
    return new Date(datevar.getTime() - (datevar.getTimezoneOffset() * 60000));
  }
  addWorkLog(totalWorkTime: number, remainingTime: number) {
    this.addWorkLogRequest = {
      projectWorkId: String(this.data.workLog.projectWorkId),
      workDoneOn: (this.updateWorkLogForm.value.workDoneOn != null) ? this.getNowUTC(this.updateWorkLogForm.value.workDoneOn) : new Date(),
      workTime: Number(this.updateWorkLogForm.value.workTimeHours) + Number(this.updateWorkLogForm.value.workTimeMinutes),
      description: this.updateWorkLogForm.value.description ?? null
    }
    console.log(this.addWorkLogRequest);
    this.api.addWorkLog(this.addWorkLogRequest).subscribe({
      next: () => {
        this.loading$.next(true);
      },
      error: (error) => {
        console.log('Error adding work log: ', error);
      },
      complete: () => {
        this.loading$.next(false);
      }
    });
    this.updateProjectWorkItemRequest = {
      projectWorkId: String(this.data.workLog.projectWorkId),
      totalTime: totalWorkTime,
      remaningTime: remainingTime
    }
    console.log(this.updateProjectWorkItemRequest);
    this.api.updateProjectWorkItemTime(this.updateProjectWorkItemRequest).subscribe({
      next: (request) => {
        this.loading$.next(true);
        if(request.isError == false)
        {
          this.responce = "WorkLog Added successfully!";
          // alert("WorkLog Added successfully!");
        }
      },
      error: (error) => {
        console.log('Error adding work log: ', error);
      },
      complete: () => {
        this.loading$.next(false);
        this.closeDialog();
      }
    });
  }
  remaningDisable() {
    if (!this.updateWorkLogForm.value.updateRemainingEst) {
      this.updateWorkLogForm.patchValue({ remainingEstHours: 0 });
      this.updateWorkLogForm.patchValue({ remainingEstMinutes: 0 });
      this.updateWorkLogForm.controls['remainingEstHours'].disable();
      this.updateWorkLogForm.controls['remainingEstMinutes'].disable();
      this.remaningEstTimeValue = null;
    }
    else {
      this.updateWorkLogForm.controls['remainingEstHours'].enable();
      this.updateWorkLogForm.controls['remainingEstMinutes'].enable();
      if (Number(this.updateWorkLogForm.value.remainingEstHours) + Number(this.updateWorkLogForm.value.remainingEstMinutes) !== 0) {
        this.remaningEstTimeValue = Number(this.updateWorkLogForm.value.remainingEstHours) + Number(this.updateWorkLogForm.value.remainingEstMinutes);
      }
      else {
        this.remaningEstTimeValue = null;
      }
    }
  }
  dateFilter = (date: Date | null): boolean => {
    if (!date) {
      return false;
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(today.getDate() - 3);
    threeDaysAgo.setHours(0, 0, 0, 0);
    
    return date >= threeDaysAgo && date <= today;
  }
  getProgressWidth(orignalTime: number, remaningTime: number): object {
    var num = 0;
    if (this.remaningEstTimeValue == null) {
      num = ((orignalTime + this.workdoneOn - remaningTime) * 100) / orignalTime;
    }
    else {
      num = ((orignalTime - this.remaningEstTimeValue) * 100) / orignalTime;
    }
    if (num >= 100) {
      num = 100;
    }
    return { 'width': num + '%' };
  }
  getProgressWidthInNum(orignalTime: number, remaningTime: number): number {
    var num = 0;
    if (this.remaningEstTimeValue == null) {
      num = ((orignalTime + this.workdoneOn - remaningTime) * 100) / orignalTime;
    }
    else {
      num = ((orignalTime - this.remaningEstTimeValue) * 100) / orignalTime;
    }
    if (num >= 100) {
      num = 100;
    }
    return num;
  }
  updateTime() {
    // console.log(this.updateWorkLogForm.value.workTimeMinutes);
    this.workdoneOn = Number(this.updateWorkLogForm.value.workTimeHours) + Number(this.updateWorkLogForm.value.workTimeMinutes);
  }
  closeDialog() {
    this.dialogRef.close(this.responce);
  }
}
