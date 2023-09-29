import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { BehaviorSubject } from 'rxjs';
import { ProjectStatus, WorkFlowType } from 'src/app/config/constants';
import { DropDownResponce, addWorkItemRequest, employeeInfo, updateWorkItemRequest, workItem } from 'src/app/models/project-model';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-new-work-item',
  templateUrl: './new-work-item.component.html',
  styleUrls: ['./new-work-item.component.css']
})
export class NewWorkItemComponent implements OnInit {
  id = '';
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private api: ProjectsService,
    private route: Router,
    private router: ActivatedRoute,
    private alertService: AlertService
  ) {
    this.router.params.subscribe(params => { this.id = params['id'] ?? ''; });
  }
  ngOnInit(): void {
    this.checkAuthentication();
  }
  projectId = localStorage.getItem('ProjectId') ?? '';
  employeeName = '';
  employeeInfo: employeeInfo = {
    profileImage: null,
    firstName: null,
    lastName: null
  };
  employeeId = localStorage.getItem('employeeId');
  workGroupId = localStorage.getItem('workGroupId');
  isAuthenticated: boolean = false;
  workFlowType: typeof WorkFlowType = WorkFlowType;
  projectStatus: typeof ProjectStatus = ProjectStatus;
  workGroup: DropDownResponce[] = [];
  employeeList: DropDownResponce[] = [];
  subProjectList: DropDownResponce[] = [];
  public loading$ = new BehaviorSubject<boolean>(false);
  addWorkItemForm = this.formBuilder.group({
    employeeId: [''],
    projectId: [''],
    subProjectId: new FormControl<bigint | null>(null),
    title: [''],
    workGroupId: [this.workGroupId],
    workFlow: [5],
    priority: ['Medium'],
    projectStatusId: [1],
    startDate: new Date(),
    endDate: new Date(),
    originalEstTime: [0],
    remainingEstTime: [{ value: 0, disabled: this.remainingEstTimeDisable() }],
    assignedEmployee: [this.employeeName],
    reportedEmployeeId: new FormControl<string | null>(this.employeeId),
    releasedToProduction: new FormControl<Boolean>(false),
    rsi: [{ value: 1, disabled: this.remainingEstTimeDisable() }],
    description: new FormControl<string | null>(null),
  });
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
  assignedEmployeeName = '';
  reportedEmployeeName = '';
  remainingEstTimeDisable(): boolean {
    this.router.params.subscribe(params => { this.id = params['id'] ?? ''; });
    return (this.id == '') ? true : false;
  }
  addWorkItemRequest: addWorkItemRequest = {
    employeeId: '',
    projectId: '',
    subProjectId: null,
    title: '',
    workGroupId: '',
    workFlow: 5,
    priority: 'Medium',
    projectStatusId: 1,
    startDate: new Date(),
    endDate: new Date(),
    originalEstTime: 0,
    remainingEstTime: 0,
    assignedEmployeeId: '',
    reportedEmployeeId: '',
    releasedToProduction: false,
    rsi: 1.0,
    description: null
  }

  updateWorkItemRequest: updateWorkItemRequest = {
    projectWorkId: '',
    employeeId: '',
    projectId: '',
    subProjectId: null,
    title: '',
    workGroupId: '',
    workFlow: 5,
    priority: 'Medium',
    projectStatusId: 1,
    startDate: new Date(),
    endDate: new Date(),
    originalEstTime: 0,
    remainingEstTime: 0,
    assignedEmployeeId: '',
    reportedEmployeeId: '',
    releasedToProduction: false,
    rsi: 1.0,
    description: null
  }

  config1: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '5rem',
    maxHeight: '15rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    sanitize: false,
    // toolbarPosition: 'top',
    outline: true,
    defaultFontName: 'Comic Sans MS',
    defaultFontSize: '5',
    // showToolbar: false,
    defaultParagraphSeparator: 'p',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  config2: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '5rem',
    maxHeight: '15rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    sanitize: true,
    toolbarPosition: 'bottom',
    defaultFontName: 'Comic Sans MS',
    defaultFontSize: '5',
    defaultParagraphSeparator: 'p',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  async checkAuthentication(): Promise<void> {
    this.isAuthenticated = await this.authService.canActivate();
    if (this.isAuthenticated) {
      this.getworkGroup();
      this.getEmployeeInfo();
      this.getemployees();
      this.getSubProjectList();
      this.updateForm();
    }
  }
  getworkGroup() {
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
  getEmployeeInfo() {
    // GetEmployeeInfo
    this.api.getEmployeeInfo(this.employeeId).subscribe({
      next: (responce) => {
        if (!responce.isError) {
          this.employeeInfo = responce.responce;
          if (this.employeeInfo.lastName != null) {
            this.employeeName = this.employeeInfo.firstName + '.' + this.employeeInfo.lastName;
          } else {
            this.employeeName = this.employeeInfo.firstName ?? '';
          }
          this.addWorkItemForm.patchValue({ assignedEmployee: this.employeeName });
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
  getemployees() {
    // Getemployees
    this.api.getEmployeeList().subscribe({
      next: (responce) => {
        if (!responce.isError) {
          this.employeeList = responce.responce;
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
  getSubProjectList() {
    // GetSubProjectList
    this.api.getSubProjectList(this.projectId).subscribe({
      next: (responce) => {
        if (!responce.isError) {
          this.subProjectList = responce.responce;
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
  updateOriginalEstTime() {
    if (this.id == '') {
      this.addWorkItemForm.patchValue({ remainingEstTime: this.addWorkItemForm.value.originalEstTime });
    }
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
          this.addWorkItemForm.patchValue({ assignedEmployee: this.assignedEmployeeName });
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
  updateForm() {
    if (this.id !== '') {
      this.api.getProjectWorkItem(this.id).subscribe({
        next: (response) => {
          if (response.isError == false) {
            this.workItem = response.responce;
            this.getEmployeeName(this.workItem.assignedEmployeeId ?? '', this.workItem.reportedEmployeeId ?? '');
            this.addWorkItemForm.patchValue({
              title: this.workItem.title,
              subProjectId: (this.workItem.subProjectId != null) ? BigInt(this.workItem.subProjectId) : null,
              workGroupId: this.workGroupId,
              workFlow: this.workItem.workFlow,
              priority: this.workItem.priority,
              projectStatusId: this.workItem.projectStatusId,
              startDate: this.workItem.startDate,
              endDate: this.workItem.endDate,
              originalEstTime: this.workItem.originalEstTime,
              remainingEstTime: this.workItem.remainingEstTime,
              assignedEmployee: this.assignedEmployeeName,
              reportedEmployeeId: String(this.workItem.reportedEmployeeId),
              releasedToProduction: this.workItem.releasedToProduction,
              rsi: this.workItem.rsi,
              description: this.workItem.description,
            });
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
  }
  submitForm() {
    this.checkAuthentication();
    this.loading$.next(true);
    if (this.id == '') {
      this.addWorkItemRequest = {
        employeeId: this.employeeId ?? '',
        projectId: this.projectId ?? '',
        subProjectId: this.addWorkItemForm.value.subProjectId ?? null,
        title: this.addWorkItemForm.value.title ?? '',
        workGroupId: this.workGroupId ?? '',
        workFlow: this.addWorkItemForm.value.workFlow ?? 5,
        priority: this.addWorkItemForm.value.priority ?? 'Medium',
        projectStatusId: this.addWorkItemForm.value.projectStatusId ?? 1,
        startDate: this.addWorkItemForm.value.startDate ?? new Date(),
        endDate: this.addWorkItemForm.value.endDate ?? new Date(),
        originalEstTime: this.addWorkItemForm.value.originalEstTime ?? 0,
        remainingEstTime: this.addWorkItemForm.value.originalEstTime ?? 0,
        assignedEmployeeId: this.employeeId ?? '',
        reportedEmployeeId: this.addWorkItemForm.value.reportedEmployeeId ?? '',
        releasedToProduction: this.addWorkItemForm.value.releasedToProduction ?? false,
        rsi: this.addWorkItemForm.value.rsi ?? 1.0,
        description: this.addWorkItemForm.value.description ?? null
      }
      // console.log(this.addWorkItemRequest);
      this.api.addWorkItem(this.addWorkItemRequest).subscribe({
        next: (response => {
          if (response.isError == false) {
            // console.log(response.responce);
            this.alertService.success(response.errorMessage, this.options);
            this.route.navigate(['project/project-backlog/workItem/' + response.responce]);
          }
        }),
        error: (error => {
          console.log("Error adding workItem: ", error);
          this.loading$.next(false);
        }),
        complete: () => {
          this.loading$.next(false);
        }
      });
    }
    else {
      this.updateWorkItemRequest = {
        projectWorkId: this.id ?? '',
        employeeId: this.employeeId ?? '',
        projectId: this.projectId ?? '',
        subProjectId: this.addWorkItemForm.value.subProjectId ?? null,
        title: this.addWorkItemForm.value.title ?? '',
        workGroupId: this.workGroupId ?? '',
        workFlow: this.addWorkItemForm.value.workFlow ?? 5,
        priority: this.addWorkItemForm.value.priority ?? 'Medium',
        projectStatusId: this.addWorkItemForm.value.projectStatusId ?? 1,
        startDate: this.addWorkItemForm.value.startDate ?? new Date(),
        endDate: this.addWorkItemForm.value.endDate ?? new Date(),
        originalEstTime: this.addWorkItemForm.value.originalEstTime ?? 0,
        remainingEstTime: this.addWorkItemForm.value.remainingEstTime ?? 0,
        assignedEmployeeId: this.employeeId ?? '',
        reportedEmployeeId: this.addWorkItemForm.value.reportedEmployeeId ?? '',
        releasedToProduction: this.addWorkItemForm.value.releasedToProduction ?? false,
        rsi: this.addWorkItemForm.value.rsi ?? 1.0,
        description: this.addWorkItemForm.value.description ?? null
      }
      // console.log(this.updateWorkItemRequest);
      this.api.updateWorkItem(this.updateWorkItemRequest).subscribe({
        next: (response => {
          if (response.isError == false) {
            // console.log(response.responce);
            this.alertService.success(response.errorMessage, this.options);
            this.route.navigate(['project/project-backlog/workItem/' + this.id]);
          }
        }),
        error: (error => {
          console.log("Error updating workItem: ", error);
          this.loading$.next(false);
        }),
        complete: () => {
          this.loading$.next(false);
        }
      });
    }
  }
  cancelSubmitForm() {
    this.addWorkItemForm.reset();
    if (this.id == '') {
      this.route.navigate(['project/work-group/' + this.workGroupId]);
    }
    else
    {
      this.route.navigate(['project/project-backlog/workItem/' + this.id]);
    }
  }
}
