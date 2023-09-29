import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { userNameResponce, userProjectResponce } from 'src/app/models/dashboard-model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { FormControl } from '@angular/forms';
import { environment } from 'src/app/config/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  isAuthenticated: boolean = false;
  userInfo: userNameResponce | null = null;
  projects: userProjectResponce[] = [];
  selectedProject: FormControl = new FormControl();
  projectId = localStorage.getItem('ProjectId');
  constructor(private authService: AuthenticationService, private api: DashboardService, private router: Router) {
    this.selectedProject.setValue(Number(this.projectId));
    // console.log("project id:", this.projectId);
    if (this.projectId == null) {
      environment.showProject = false;
    }
    else if (this.projectId != null) {
      environment.showProject = true;
    }
    // console.log("environment.showProject: ", environment.showProject);
  }

  updateProject() {
    if (this.selectedProject.value != null) {
      localStorage.setItem('ProjectId', String(this.selectedProject.value));
      console.log("updated project id:", this.selectedProject.value);
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => this.router.navigate(['/project', 'work-group', this.selectedProject.value]));
    }
    else {
      localStorage.removeItem('ProjectId');
    }
  }

  toggleMenu() {
    this.toggleSidebar.emit();
  }

  ngOnInit(): void {
    this.checkAuthentication();
  }

  async checkAuthentication(): Promise<void> {
    this.isAuthenticated = await this.authService.canActivate();
    if (this.isAuthenticated) {
      const id = localStorage.getItem('employeeId');
      if (id != null) {
        // GetEmployee In Header
        this.api.employeeInfo(id).subscribe({
          next: (response) => {
            if (!response.isError) {
              this.userInfo = response.responce;
              // console.log(response);
            }
            else {
              alert("Error: " + response.responce.errorMessage);
            }
          },
          error: (error) => {
            console.log('Error fetching user information:', error);
          }
        });
        // Get project in header
        this.api.getUserProjects(id).subscribe({
          next: (response) => {
            if (!response.isError) {
              this.projects = response.responce;
              // console.log(response);
            }
            else {
              alert("Error: " + response.responce.errorMessage);
            }
          },
          error: (error) => {
            console.log('Error fetching projects:', error);
          }
        });
        ///////////////////////////////
      }
    }
  }

  logout() {
    localStorage.clear();
    alert("You've been logged out, Please Login again!");
    this.router.navigate(['/login']);
  }

  goToProfile() {
    this.router.navigate(['/user', 'details']);
  }

}