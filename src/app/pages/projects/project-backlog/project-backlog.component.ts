import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { ProjectStatus, WorkFlowType, environment } from 'src/app/config/constants';
import { DropDownResponce, ProjectBackLogRequest, ProjectLog } from 'src/app/models/project-model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-project-backlog',
  templateUrl: './project-backlog.component.html',
  styleUrls: ['./project-backlog.component.css']
})
export class ProjectBacklogComponent implements OnInit {
  id = 0;
  isAuthenticated: boolean = false;
  workFlowType: typeof WorkFlowType = WorkFlowType;
  projectStatus: typeof ProjectStatus = ProjectStatus;
  workGroup: DropDownResponce[] = [];
  employeeList: DropDownResponce[] = [];
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private authService: AuthenticationService, private api: ProjectsService) {
    environment.showProject = true;
    this.route.params.subscribe(params => { this.id = params['id']; localStorage.setItem('ProjectId', params['id']); });
  }
  totalProjectCount = 0;
  currentpage = 1;
  sortBy = 'title';
  isSortByAsc = true;
  pageSizes = [3, 10, 20, 100];
  isLoading = false;
  projects: ProjectLog[] = [];
  Pages: number[] = [];
  searchProjectLogForm = this.formBuilder.group({
    searchText: [''],
    workGroupId: [null],
    assignedPersonId: [[null]],
    reportedPersonId: [null],
    projectType: [[null]],
    projectStatus: [[null]],
    startDate: [null],
    endDate: [null],
    priority: [null],
    pageSize: this.pageSizes[0]
  });
  projectRequest: ProjectBackLogRequest = {
    projectId: String(this.id),
    searchText: null,
    workGroupId: null,
    assignedPersonId: '',
    reportedPersonId: null,
    projectType: '',
    projectStatus: '',
    startDate: null,
    endDate: null,
    priority: null,
    pageNumber: 1,
    pageSize: this.pageSizes[0],
    expression: this.sortBy,
    isSortByAsc: this.isSortByAsc
  };
  ngOnInit(): void {
    this.checkAuthentication();
  }

  async checkAuthentication(): Promise<void> {
    this.isAuthenticated = await this.authService.canActivate();
    if (this.isAuthenticated && this.id != 0) {
      // GetworkGroup
      this.api.getAllWorkGroupForProject(this.id).subscribe({
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
      // Getprojects
      this.updateProjectRequest();
      console.log(this.projectRequest);
      this.api.getProjectBackLog(this.projectRequest).subscribe({
        next: (responce) => {
          this.isLoading = true;
          if (!responce.isError) {
            this.projects = responce.responce.projectBackLogs;
            this.totalProjectCount = responce.responce.totalProjectBacklogs;
            this.pagination();
          }
          else {
            console.log(responce.errorMessage);
          }
        },
        error: (error) => {
          console.log("Error fetching project tech: ", error);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
  updateProjectRequest() {
    this.projectRequest.projectId = String(this.id);
    this.projectRequest.searchText = this.searchProjectLogForm.value.searchText?.trim() ?? null;
    this.projectRequest.workGroupId = this.searchProjectLogForm.value.workGroupId ?? null;
    this.projectRequest.assignedPersonId = ((this.searchProjectLogForm.value.assignedPersonId != null) ? this.searchProjectLogForm.value.assignedPersonId.filter(value => value !== null && value !== '').join(',') : '');
    this.projectRequest.reportedPersonId = this.searchProjectLogForm.value.reportedPersonId ?? null;
    this.projectRequest.projectType = (this.searchProjectLogForm.value.projectType != null) ? this.searchProjectLogForm.value.projectType.filter(value => value !== null && value !== '').map(value => String(Number(value) + 1)).join(',') : '';
    this.projectRequest.projectStatus = (this.searchProjectLogForm.value.projectStatus != null) ? this.searchProjectLogForm.value.projectStatus.filter(value => value !== null && value !== '').map(value => String(Number(value) + 1)).join(',') : '';
    this.projectRequest.startDate = (this.searchProjectLogForm.value.startDate != null) ? this.getNowUTC(this.searchProjectLogForm.value.startDate) : null;
    this.projectRequest.endDate = (this.searchProjectLogForm.value.endDate != null) ? this.getNowUTC(this.searchProjectLogForm.value.endDate) : null;
    this.projectRequest.priority = this.searchProjectLogForm.value.priority ?? null;
    this.projectRequest.pageNumber = this.currentpage;
    this.projectRequest.pageSize = this.searchProjectLogForm.value.pageSize ?? this.pageSizes[0];
    this.projectRequest.expression = this.sortBy;
    this.projectRequest.expression = this.sortBy;
    this.projectRequest.isSortByAsc = this.isSortByAsc;
  }
  resetForm() {
    this.searchProjectLogForm.reset();
    this.searchProjectLogForm.patchValue({pageSize: this.pageSizes[0]});
  }
  
  updateResponce() {
    this.checkAuthentication();
  }

  // Calculate the total number of pages
  get totalPages(): number {
    return Math.ceil(this.totalProjectCount / (this.searchProjectLogForm.value.pageSize ?? 1));
  }

  // Pagination
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
    for (let index = 0; index < (this.totalProjectCount / (this.searchProjectLogForm.value.pageSize ?? 1)); index++) {
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

  // Multi Select
  allSelectedAssignedTo = false;
  allSelectedProjectType = false;
  allSelectedProjectStatus = false;

  @ViewChild('multiSelectAssignedTo') multiSelectAssignedTo!: MatSelect;
  @ViewChild('multiSelectProjectType') multiSelectProjectType!: MatSelect;
  @ViewChild('multiSelectProjectStatus') multiSelectProjectStatus!: MatSelect;

  toggleAllSelectionAssignedTo() {
    this.allSelectedAssignedTo = !this.allSelectedAssignedTo;  // to control select-unselect

    if (this.allSelectedAssignedTo) {
      this.multiSelectAssignedTo.options.forEach((item: MatOption) => { (item.value != null) ? item.select() : item.deselect() });
    } else {
      this.multiSelectAssignedTo.options.forEach((item: MatOption) => { item.deselect() });
    }
    this.multiSelectAssignedTo.close();
  }
  toggleAllSelectionProjectType() {
    this.allSelectedProjectType = !this.allSelectedProjectType;  // to control select-unselect

    if (this.allSelectedProjectType) {
      this.multiSelectProjectType.options.forEach((item: MatOption) => { (item.value != null) ? item.select() : item.deselect() });
    } else {
      this.multiSelectProjectType.options.forEach((item: MatOption) => { item.deselect() });
    }
    this.multiSelectProjectType.close();
  }
  toggleAllSelectionProjectStatus() {
    this.allSelectedProjectStatus = !this.allSelectedProjectStatus;  // to control select-unselect

    if (this.allSelectedProjectStatus) {
      this.multiSelectProjectStatus.options.forEach((item: MatOption) => { (item.value != null) ? item.select() : item.deselect() });
    } else {
      this.multiSelectProjectStatus.options.forEach((item: MatOption) => { item.deselect() });
    }
    this.multiSelectProjectStatus.close();
  }
  //End Of Multi Select
  formatTime(decimalValue: number): string {
    const hours = Math.floor(decimalValue);
    const minutes = Math.round((decimalValue - hours) * 60);
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }
  
  private getNowUTC(datevar: Date) {
    return new Date(datevar.getTime() - (datevar.getTimezoneOffset() * 60000));
  }

}
