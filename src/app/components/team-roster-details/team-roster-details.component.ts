import { Component, OnInit } from '@angular/core';
import { TeamRosTerResponce } from 'src/app/models/project-model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-team-roster-details',
  templateUrl: './team-roster-details.component.html',
  styleUrls: ['./team-roster-details.component.css']
})
export class TeamRosterDetailsComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private api: ProjectsService
  ) { }
  ngOnInit(): void {
    this.checkAuthentication();
  }
  isAuthenticated: boolean = false;
  TeamRosTerResponces: TeamRosTerResponce[] = [];
  async checkAuthentication(): Promise<void> {
    this.isAuthenticated = await this.authService.canActivate();
    if (this.isAuthenticated) {
      var projectId = localStorage.getItem('ProjectId');
      this.getTeamRoster(projectId);
    }
  }
  getTeamRoster(id: string | null) {
    if (id != null) {
      this.api.getProjectTeamRoster(id).subscribe({
        next: (responce) => {
          if (!responce.isError) {
            this.TeamRosTerResponces = responce.responce;
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
}
