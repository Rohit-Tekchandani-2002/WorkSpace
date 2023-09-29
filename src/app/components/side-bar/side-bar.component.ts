import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/config/constants';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  activeItem: string | null = 'dashboard';
  showProjects = environment.showProject;
  projectId = localStorage.getItem('ProjectId');
  workGroupId = localStorage.getItem('workGroupId');
  ngOnInit(): void {
  }
  constructor(private router: Router) {}
  activateItem(item: string) {
    this.activeItem = this.activeItem === item ? null : item;
  }

  isSidebarOpen = true;

  // Toggle the sidebar state
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  routeToWorkGroup() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/project', 'work-group', this.projectId]));
  }
}

