import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { SlideInOutAnimation } from 'src/app/animation';
import { UpdateWorklogDialogComponent } from 'src/app/components/update-worklog-dialog/update-worklog-dialog.component';
import { ProjectStatus, WorkFlowType, environment } from 'src/app/config/constants';
import { userProjectResponce } from 'src/app/models/dashboard-model';
import { DropDownResponce, ProjectBackLogFormProjectIdRequest, ProjectBackLogRequest, ProjectLog, WorkLog } from 'src/app/models/project-model';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-project-work-item',
  templateUrl: './project-work-item.component.html',
  styleUrls: ['./project-work-item.component.css'],
  animations: [SlideInOutAnimation]
})
export class ProjectWorkItemComponent implements OnInit {
  isAuthenticated: boolean = false;
  WorkLogs: WorkLog[] = [];
  ProjectWorkLogs: { projectId: string, worklog: WorkLog[] }[] = [];
  workFlowType: typeof WorkFlowType = WorkFlowType;
  projectStatus: typeof ProjectStatus = ProjectStatus;
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
  }
  sortBy = 'title';
  isSortByAsc = true;
  isLoading = false;
  searchProjectLogForm = this.formBuilder.group({
    projectId: new FormControl<string | null>(null)
  });
  projectRequest: ProjectBackLogFormProjectIdRequest = {
    projectId: null,
    assignedPersonId: this.employeeId ?? null,
    expression: this.sortBy,
    isSortByAsc: this.isSortByAsc
  };
  projects: userProjectResponce[] = [];

  ngOnInit(): void {
    this.checkAuthentication();
  }

  async checkAuthentication(): Promise<void> {
    this.isAuthenticated = await this.authService.canActivate();
    if (this.isAuthenticated) {
      //GetUserProjects
      this.userApi.getUserProjects(this.employeeId).subscribe({
        next: (response) => {
          if (!response.isError) {
            this.projects = response.responce;
            // Getprojects
            this.updateProjectRequest();
            console.log(this.projectRequest);
            this.ProjectWorkLogs = [];
            if (this.projectRequest.projectId != null) {
              this.api.getWorkLogFromProjectId(this.projectRequest).subscribe({
                next: (responce) => {
                  this.isLoading = true;
                  if (!responce.isError) {
                    this.WorkLogs = responce.responce;
                    var tempLog = this.WorkLogs;
                    var tempid = this.projectRequest.projectId ?? '';
                    var temp: { projectId: string, worklog: WorkLog[] } = {
                      projectId: tempid,
                      worklog: tempLog
                    };
                    if (!this.ProjectWorkLogs.includes(temp)) {
                      this.ProjectWorkLogs.push(temp);
                    }
                  }
                  else {
                    console.log(responce.errorMessage);
                  }
                },
                error: (error) => {
                  console.log("Error fetching project log: ", error);
                },
                complete: () => {
                  this.isLoading = false;
                }
              });
            } else {
              console.log(this.projects.length);
              for (let i = 0; i < this.projects.length; i++) {
                let project = this.projects[i];
                this.projectRequest = {
                  projectId: String(project.projectId),
                  assignedPersonId: this.employeeId ?? null,
                  expression: this.sortBy,
                  isSortByAsc: this.isSortByAsc
                };
                console.log('req', this.projectRequest);
                this.api.getWorkLogFromProjectId(this.projectRequest).subscribe({
                  next: (responce) => {
                    this.isLoading = true;
                    if (!responce.isError) {
                      this.WorkLogs = responce.responce;
                      var tempLog = this.WorkLogs;
                      var tempid = String(project.projectId);
                      var temp: { projectId: string, worklog: WorkLog[] } = {
                        projectId: tempid,
                        worklog: tempLog
                      };
                      if (!this.ProjectWorkLogs.includes(temp)) {
                        this.ProjectWorkLogs.push(temp);
                      }
                    }
                    else {
                      console.log(responce.errorMessage);
                    }
                  },
                  error: (error) => {
                    console.log("Error fetching project log: ", error);
                  },
                  complete: () => {
                    this.isLoading = false;
                  }
                });
              }
            }
            console.log(this.ProjectWorkLogs);
          }
          else {
            alert("Error: " + response.responce.errorMessage);
          }
        },
        error: (error) => {
          console.log('Error fetching projects:', error);
        }
      });
    }
  }
  updateProjectRequest() {
    this.projectRequest.projectId = this.searchProjectLogForm.value.projectId ?? null;
    this.projectRequest.assignedPersonId = this.employeeId;
    this.projectRequest.expression = this.sortBy;
    this.projectRequest.isSortByAsc = this.isSortByAsc;
  }
  resetForm() {
    this.searchProjectLogForm.reset();
  }

  updateResponce() {
    this.checkAuthentication();
  }

  formatTime(decimalValue: number): string {
    const hours = Math.floor(decimalValue);
    const minutes = Math.round((decimalValue - hours) * 60);
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }

  private getNowUTC(datevar: Date) {
    return new Date(datevar.getTime() - (datevar.getTimezoneOffset() * 60000));
  }

  Sort(sortby: string) {
    this.sortBy = sortby;
    this.checkAuthentication();
    this.isSortByAsc = !this.isSortByAsc;
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

  gettingProjectNameFormId(id: string): string{
    let projectName = this.projects.filter(item => String(item.projectId) == id).map(name => (name.projectName))[0];
    return projectName;
  }
}
