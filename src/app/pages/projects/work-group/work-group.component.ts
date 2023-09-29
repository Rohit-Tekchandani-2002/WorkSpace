import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/config/constants';
import { ActivatedRoute } from "@angular/router";
import { WorkGroup, WorkGroupProjectStatus, WorkLog, getWorkRequest } from 'src/app/models/project-model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { MatDialog } from '@angular/material/dialog';
import { WorkHistoryDialogComponent } from 'src/app/components/work-history-dialog/work-history-dialog.component';
import { BehaviorSubject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-work-group',
  templateUrl: './work-group.component.html',
  styleUrls: ['./work-group.component.css']
})
export class WorkGroupComponent implements OnInit {
  id: string = '0';
  totalStatusCount = 0;
  totalPersentage: number[][] = [];
  isAuthenticated: boolean = false;
  WorkGroup: WorkGroup[] = [];
  ProjectStatus: WorkGroupProjectStatus[] = [];
  WorkLogs: WorkLog[] = [];
  getWorkRequest: getWorkRequest = {
    workGroupId: this.id,
    searchText: null,
    projectType: null,
    projectStatus: null,
    assignedPersonId: null,
    expression: 'ProjectWorkId',
    isSortByAsc: true
  }
  public loading$ = new BehaviorSubject<boolean>(false);
  constructor(private route: ActivatedRoute, private authService: AuthenticationService, private api: ProjectsService, private dialog: MatDialog) {
    environment.showProject = true;
    this.route.params.subscribe(params => { this.id = params['id']; localStorage.setItem('ProjectId', params['id']);});
  }
  ngOnInit(): void {
    this.checkAuthentication();
    $(document).ready(function() {
      $('[data-toggle="tooltip"]').tooltip({html:true});
    })
  }
  async checkAuthentication(): Promise<void> {
    this.isAuthenticated = await this.authService.canActivate();
    if (this.isAuthenticated) {
      this.getWorkGroup();
      this.getWorkGroupStatus();
      this.getPersentage();
    }
  }
  getWorkGroup() {
    // console.log(this.id);
    if (this.id != '0') {
      this.api.getWorkGroup(this.id).subscribe({
        next: (responce) => {
          if (!responce.isError) {
            this.WorkGroup = responce.responce;
            if (this.WorkGroup.length != 0) {
              localStorage.setItem('workGroupId', String(this.WorkGroup[0].workGroupId));
            }
            // console.log(this.WorkGroup.length != 0);
          }
          else {
            console.log(responce.errorMessage);
          }
        },
        error: (error) => {
          console.log("Error fetching work group: ", error);
        }
      });
    }
  }
  getWorkGroupStatus() {
    // console.log(this.id);
    this.loading$.next(true);
    this.api.getProjectStatusCount(this.id).subscribe({
      next: (responce) => {
        if (!responce.isError) {
          this.ProjectStatus = responce.responce;
          this.totalStatusCount = 0;
          console.log(this.ProjectStatus);
        }
        else {
          console.log(responce.errorMessage);
        }
      },
      error: (error) => {
        console.log("Error fetching work status count: ", error);
      },
      complete : () => {
        this.loading$.next(false);
      }
    });

  }
  getPersentage() {
    for (let index = 0; index < this.WorkGroup.length; index++) {
      let WorkId = Number(this.WorkGroup[index].workGroupId);
      this.api.getWorkGroupStatusCount(this.id, WorkId).subscribe({
        next: (responce) => {
          if (!responce.isError) {
            this.totalStatusCount = 0;
            for (let index = 0; index < responce.responce.length; index++) {
              let element = responce.responce[index].statusCount;
              this.totalStatusCount += element;
            }
            let temp: number[] = [];
            this.totalPersentage = [];
            for (let index = 0; index < responce.responce.length; index++) {
              let element = Number(responce.responce[index].statusCount);
              // console.log(WorkId, (element/(this.totalStatusCount))*100);
              temp.push((element / (this.totalStatusCount)) * 100);
            }
            this.totalPersentage.push(temp);
          }
          else {
            console.log(responce.errorMessage);
          }
        },
        error: (error) => {
          console.log("Error fetching work status count: ", error);
        }
      });
    }
  }
  getWorkHistory(id: bigint) : Promise<WorkLog[]> {
    return new Promise<WorkLog[]>((resolve, reject) => {
      this.getWorkRequest = {
        workGroupId: this.id,
        searchText: null,
        projectType: null,
        projectStatus: null,
        assignedPersonId: null,
        expression: 'ProjectWorkId',
        isSortByAsc: true
      }
      this.api.getWorkGroupInfo(this.getWorkRequest).subscribe({
        next: (responce) => {
          if (!responce.isError) {
            this.WorkLogs = [];
            this.WorkLogs = responce.responce;
            resolve(this.WorkLogs);
            // console.log(this.WorkLogs);
          }
          else {
            console.log(responce.errorMessage);
            resolve([]);
          }
        },
        error: (error) => {
          console.log("Error fetching work logs: ", error);
          resolve([]);
        }
      });
    });
  }
  getProgressWidth(num: number): object {
    return { 'width': num + '%' };
  }
  async OpenWorkHistoryEventModal(id: bigint) {
    this.WorkLogs = await this.getWorkHistory(id);
    console.log(this.WorkLogs);
    if (this.WorkLogs) {
      let workLogs = this.WorkLogs;
      const dialogRef = this.dialog.open(WorkHistoryDialogComponent, {
        data: {
          workLogs
        },
        position: {top:'20px'} 
      });
    }
  }
}
