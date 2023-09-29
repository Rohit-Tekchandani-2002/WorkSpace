import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectStatus, ProjectType } from 'src/app/config/constants';
import { Project, ProjectRequest, DropDownResponce } from 'src/app/models/project-model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit{

  constructor(
    private authService: AuthenticationService,
    private api: ProjectsService,
    private formBuilder: FormBuilder
  ) { 
  }

  isAuthenticated: boolean = false;
  projectStatus: typeof ProjectStatus = ProjectStatus;
  projectType: typeof ProjectType = ProjectType;
  projectTech: DropDownResponce[] = [];

  totalProjectCount = 0;
  currentpage = 1;
  sortBy = 'projectCode';
  isSortByAsc = true;
  pageSizes = [10,20,50,100,200];
  isLoading = false;
  projects: Project[] = [];
  Pages: number[] = [];

  projectRequest: ProjectRequest = {
    employeeId: localStorage.getItem('employeeId') ?? '0',
    projectStatus: null,
    projectName: null,
    projectType: null,
    projectTechId: null,
    pageNumber: 1,
    pageSize: this.pageSizes[0],
    expression: this.sortBy,
    isSortByAsc: this.isSortByAsc
  };
  searchProjectForm = this.formBuilder.group({
    status: [null],
    name: [''],
    type: [null],
    tech: [null],
    pagesize: this.pageSizes[0]
  });

  ngOnInit(): void {
    this.checkAuthentication();
  }

  async checkAuthentication(): Promise<void> {
    this.isAuthenticated = await this.authService.canActivate();
    if (this.isAuthenticated) {
      // Get Project Tech
      this.api.getProjectTech().subscribe({
        next: (responce) => {
          if (!responce.isError) {
            this.projectTech = responce.responce;
            // console.log(this.projectTech);
          }
          else {
            console.log(responce.errorMessage);
          }
        },
        error: (error) => {
          console.log("Error fetching project tech: ", error);
        }
      });
      // Get Project
      this.updateProjectRequest();
      this.api.getProjects(this.projectRequest).subscribe({
        next: (responce) => {
          this.isLoading = true;
          if (!responce.isError) {
            this.projects = responce.responce.projects;
            this.totalProjectCount = responce.responce.totalProjects;
            // console.log(this.projects);
            this.pagination();
          }
          else {
            console.log(responce.errorMessage);
          }
        },
        error: (error) => {
          console.log("Error fetching projects: ", error);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
  updateProjectRequest(){
    this.projectRequest.projectName = this.searchProjectForm.value.name?.trim() ?? null;
    this.projectRequest.projectStatus = this.searchProjectForm.value.status ?? null;
    this.projectRequest.projectTechId = this.searchProjectForm.value.tech ?? null;
    this.projectRequest.projectType = this.searchProjectForm.value.type ?? null;
    this.projectRequest.pageSize = this.searchProjectForm.value.pagesize ?? this.pageSizes[0];
    this.projectRequest.pageNumber = this.currentpage;
    this.projectRequest.expression = this.sortBy;
    this.projectRequest.isSortByAsc = this.isSortByAsc;
  }
  resetForm(){
    this.searchProjectForm.reset();
    this.searchProjectForm.patchValue({ pagesize : this.pageSizes[0]});
  }
  updateResponce(){
    this.checkAuthentication();
  }
  pagination(){
    this.Pages = [];
    for (let index = 0; index < (this.totalProjectCount/(this.searchProjectForm.value.pagesize ?? 1)); index++) {
      this.Pages.push(index + 1);
    }
  }
  Sort(sortby: string){
    this.sortBy = sortby;
    this.checkAuthentication();
    this.isSortByAsc = !this.isSortByAsc;
  }
  Previous(currentpage: number){
    for (let index = (this.Pages.length-1); index >= 0; index--) {
      let element = this.Pages[index];
      if (element < currentpage) {
        this.currentpage = element;
        this.checkAuthentication();
        return;
      } 
    }
  }
  Next(currentpage : number){
    for (let index = 0; index < this.Pages.length; index++) {
      let element = this.Pages[index];
      if (element > currentpage) {
        this.currentpage = element;
        this.checkAuthentication();
        return;
      } 
    }
  }
}
