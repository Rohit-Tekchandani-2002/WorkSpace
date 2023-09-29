import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { newsAndUpdatesResponce } from 'src/app/models/dashboard-model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { MatDialog } from '@angular/material/dialog';
import { NewsDialogComponent } from 'src/app/components/news-dialog/news-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isAuthenticated: boolean = false;
  newsAndUpdates: newsAndUpdatesResponce[] = [];
  selectedProject: FormControl = new FormControl();
  constructor(private authService: AuthenticationService, private api: DashboardService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.checkAuthentication();
  }

  async checkAuthentication(): Promise<void> {
    this.isAuthenticated = await this.authService.canActivate();
    if (this.isAuthenticated) {
      // Get news and updates
      this.api.getNewsAndUpdates().subscribe({
        next: (response) => {
          if (!response.isError) {
            this.newsAndUpdates = response.responce;
            // console.log(this.newsAndUpdates);
          }
          else {
            alert("Error: " + response.responce.errorMessage);
          }
        },
        error: (error) => {
          console.log('Error fetching news information:', error);
        }
      });
    }
  }

  OpenNewsEventModal(id: bigint) {
    const selectedNews = this.newsAndUpdates.find(news => news.newsId === id);
    if (selectedNews) {
      const dialogRef = this.dialog.open(NewsDialogComponent, {
        data: {
          selectedNews
        },
        position: {top:'20px'} 
      });
    }
  }
}