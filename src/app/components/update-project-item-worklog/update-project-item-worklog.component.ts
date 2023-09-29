import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { UpdateWorkLogRequest, WorkItemLog, addWorkLogRequest, updateProjectWorkItemRequest } from 'src/app/models/project-model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-update-project-item-worklog',
  templateUrl: './update-project-item-worklog.component.html',
  styleUrls: ['./update-project-item-worklog.component.css']
})
export class UpdateProjectItemWorklogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { workLog: WorkItemLog },
    private dialogRef: MatDialogRef<UpdateProjectItemWorklogComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private api: ProjectsService
  ) { }
  ngOnInit(): void {
    this.checkAuthentication();
  }
  updateWorkLogForm = this.formBuilder.group({
    workDoneOn: [new Date()],
    workTimeHours: [0],
    workTimeMinutes: [0],
    description: new FormControl<string | null>(null)
  });
  updateWorkLogRequest: UpdateWorkLogRequest = {
    workLogId: '0',
    workDoneOn: new Date(),
    workTime: 0,
    description: null
  }
  workdoneOn: number = 0;
  remaningEstTimeValue: number | null = null;
  isAuthenticated: boolean = false;
  responce = '';
  public loading$ = new BehaviorSubject<boolean>(false);
  async checkAuthentication(): Promise<void> {
    this.isAuthenticated = await this.authService.canActivate();
    if (this.isAuthenticated) {
      this.updateForm();
    }
  }
  updateWorkLog() {
    this.updateWorkLogRequest = {
      workLogId: String(this.data.workLog.workLogId),
      workDoneOn: this.updateWorkLogForm.value.workDoneOn ?? new Date(),
      workTime: Number(this.updateWorkLogForm.value.workTimeHours) + Number(this.updateWorkLogForm.value.workTimeMinutes),
      description: this.updateWorkLogForm.value.description ?? null
    }
    console.log(this.updateWorkLogRequest);
    this.api.updateProjectItemWorkLog(this.updateWorkLogRequest).subscribe({
      next: () => {
        this.loading$.next(true);
        this.responce = "WorkLog Added successfully!";
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

  updateForm() {
    var tempHours = Math.floor(this.data.workLog.workedHours);
    var tempMin = Math.round((this.data.workLog.workedHours - tempHours) * 60);
    this.updateWorkLogForm.patchValue({
      workDoneOn: this.data.workLog.workDoneOn ?? new Date(),
      workTimeHours: tempHours,
      workTimeMinutes: tempMin,
      description: this.data.workLog.description ?? null
    });
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

  updateTime() {
    // console.log(this.updateWorkLogForm.value.workTimeMinutes);
    this.workdoneOn = Number(this.updateWorkLogForm.value.workTimeHours) + Number(this.updateWorkLogForm.value.workTimeMinutes);
  }
  closeDialog() {
    this.dialogRef.close(this.responce);
  }
}
