import { Component } from '@angular/core';
import { ProjectStatus } from 'src/app/config/constants';
import { userNameResponce } from 'src/app/models/dashboard-model';
import { ActivityStreamRequest, ActivityStreamResponce } from 'src/app/models/project-model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-activity-stream',
  templateUrl: './activity-stream.component.html',
  styleUrls: ['./activity-stream.component.css']
})
export class ActivityStreamComponent {
  constructor(
    private authService: AuthenticationService,
    private api: ProjectsService,
    private userApi: DashboardService
  ) { }
  ngOnInit(): void {
    this.checkAuthentication();
  }
  isAuthenticated: boolean = false;
  employeeId = localStorage.getItem('employeeId');
  numberOfClicks: number = 0;
  userInfo: userNameResponce | null = null;
  filePathChar: string | null = null;
  request: ActivityStreamRequest = {
    employeeId: this.employeeId ?? '',
    numberOfClicks: null
  }
  data: any = null;
  ActivityStreamResponces: ActivityStreamResponce[] = [];
  projectStatus: typeof ProjectStatus = ProjectStatus;
  async checkAuthentication(): Promise<void> {
    this.isAuthenticated = await this.authService.canActivate();
    if (this.isAuthenticated) {
      this.getActivityStream(this.employeeId);
      this.getUserInfo();
    }
  }
  getActivityStream(id: string | null) {
    if (id != null) {
      this.request = {
        employeeId: id,
        numberOfClicks: this.numberOfClicks
      }
      console.log('request: ',this.request);
      this.api.getActivityStream(this.request).subscribe({
        next: (responce) => {
          if (!responce.isError) {
            if (this.ActivityStreamResponces.length === 0) {
              this.ActivityStreamResponces = responce.responce;
            }else if (this.ActivityStreamResponces.length > 0 && responce.responce.length > 0){
              for (let index = 0; index < responce.responce.length; index++) {
                let element = responce.responce[index];
                if (!this.ActivityStreamResponces.includes(element) && responce.responce.length > 0) {
                  this.ActivityStreamResponces.push(element);
                }
              }
            }
            console.log(this.ActivityStreamResponces);
            this.data = this.groupByKey(this.ActivityStreamResponces, 'titleDate');
          } else {
            console.log('Error: ', responce.errorMessage)
          }
        },
        error: (error) => {
          console.log('Error getting team roster: ', error)
        }
      });
    }
    else {
      alert('Project not Found');
    }
  }
  getUserInfo() {
    this.userApi.employeeInfo(this.employeeId).subscribe({
      next: (response) => {
        if (!response.isError) {
          this.userInfo = response.responce;
          if (this.userInfo?.firstName != null) {
            this.filePathChar = this.userInfo?.firstName[0].toLowerCase();
            console.log(this.filePathChar);
          }
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
  showMore(){
    this.numberOfClicks = this.numberOfClicks + 1;
    this.checkAuthentication();

  }
  groupByKey(inputList: any[], inputKey: string | number) : {key: string[], value: any}{
    const groupByKey = (list: any[], key: string | number) => list.reduce((hash, obj) => ({ ...hash, [obj[key]]: (hash[obj[key]] || []).concat(obj) }), {});
    var temp = groupByKey(inputList, inputKey);
    const keys: string[] = Object.keys(temp);
    return {key: keys, value: temp};
  }
  formatTime(decimalValue: number): string {
    const hours = Math.floor(decimalValue);
    const minutes = Math.round((decimalValue - hours) * 60);
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }
}
