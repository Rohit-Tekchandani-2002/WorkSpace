import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { WorkGroupLogsRequest, WorkGroupLogsResponce } from 'src/app/models/project-model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-project-work-group-logs-table',
  templateUrl: './project-work-group-logs-table.component.html',
  styleUrls: ['./project-work-group-logs-table.component.css']
})
export class ProjectWorkGroupLogsTableComponent implements OnChanges {
  @Input() WorkGroupId = '';
  constructor(
    private api: ProjectsService,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder
  ) { }
  isAuthenticated: boolean = false;
  //Table Pagination
  totalEntrys = 0;
  sortBy = 'workLogId';
  isSortByAsc = true;
  currentpage = 1;
  pageSizes = [3, 10, 20, 100];
  Pages: number[] = [];
  searchProjectLogForm = this.formBuilder.group({
    pageSize: this.pageSizes[0]
  });
  // Calculate the total number of pages
  get totalPages(): number {
    return Math.ceil(this.totalEntrys / (this.searchProjectLogForm.value.pageSize ?? 1));
  }
  get visiblePages(): (number | string)[] {
    const maxVisiblePages = 4;
    const currentPage = this.currentpage;
    const lastPage = this.totalPages;

    if (lastPage <= maxVisiblePages) {
      return Array.from({ length: lastPage }, (_, i) => i + 1);
    }

    const visible = [];
    const start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const end = Math.min(lastPage, start + maxVisiblePages - 1);

    if (start > 1) {
      visible.push('...');
    }

    for (let i = start; i <= end; i++) {
      visible.push(i);
    }

    if (end < lastPage) {
      visible.push('...');
    }

    return visible;
  }
  isPageNumber(item: any): item is number {
    return typeof item === 'number';
  }
  pagination() {
    this.Pages = [];
    for (let index = 0; index < (this.totalEntrys / (this.searchProjectLogForm.value.pageSize ?? 1)); index++) {
      this.Pages.push(index + 1);
    }
  }
  Sort(sortby: string) {
    this.sortBy = sortby;
    this.checkAuthentication();
    this.isSortByAsc = !this.isSortByAsc;
  }
  Previous(currentpage: number) {
    for (let index = (this.Pages.length - 1); index >= 0; index--) {
      let element = this.Pages[index];
      if (element < currentpage) {
        this.currentpage = element;
        this.checkAuthentication();
        return;
      }
    }
  }
  Next(currentpage: number) {
    for (let index = 0; index < this.Pages.length; index++) {
      let element = this.Pages[index];
      if (element > currentpage) {
        this.currentpage = element;
        this.checkAuthentication();
        return;
      }
    }
  }
  // End Of Pagination
  responce: WorkGroupLogsResponce[] = [];
  request: WorkGroupLogsRequest = {
    workGroupId: this.WorkGroupId,
    pageNumber: this.currentpage,
    pageSize: this.searchProjectLogForm.value.pageSize ?? this.pageSizes[0],
    expression: this.sortBy,
    isSortByAsc: this.isSortByAsc
  }
  ngOnChanges() {
    /**********THIS FUNCTION WILL TRIGGER WHEN PARENT COMPONENT UPDATES '@Input'**************/
    this.checkAuthentication();
    console.log(this.WorkGroupId);
  }
  async checkAuthentication(): Promise<void> {
    this.isAuthenticated = await this.authService.canActivate();
    if (this.isAuthenticated) {
      this.getResponce();
    }
  }
  getResponce() {
    this.request = {
      workGroupId: this.WorkGroupId,
      pageNumber: this.currentpage,
      pageSize: this.searchProjectLogForm.value.pageSize ?? this.pageSizes[0],
      expression: this.sortBy,
      isSortByAsc: this.isSortByAsc
    }
    this.api.getProjectWorkGroupLogs(this.request).subscribe({
      next: (responce) => {
        if (!responce.isError) {
          this.responce = responce.responce.projectWorkLogs;
          this.totalEntrys = responce.responce.totalProjectBacklogs;
          this.pagination();
        }
        else {
          console.log("Error", responce.errorMessage)
        }
      },
      error: (error) => {
        console.log("Error getting worklogs", error);
      }
    });
  }
  formatTime(decimalValue: number): string {
    const hours = Math.floor(decimalValue);
    const minutes = Math.round((decimalValue - hours) * 60);
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }
}
