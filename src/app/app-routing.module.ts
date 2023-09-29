import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';
import { LoginformComponent } from './components/loginform/loginform.component';
import { ForgotPasswordformComponent } from './components/forgot-passwordform/forgot-passwordform.component';
import { DashboardComponent } from './pages/home/dashboard/dashboard.component';
import { DetailsComponent } from './pages/user/details/details.component';
import { AttendanceComponent } from './pages/workSpace/attendance/attendance.component';
import { ProjectsComponent } from './pages/workSpace/projects/projects.component';
import { WorkGroupComponent } from './pages/projects/work-group/work-group.component';
import { ProjectBacklogComponent } from './pages/projects/project-backlog/project-backlog.component';
import { WorkBacklogComponent } from './pages/projects/work-backlog/work-backlog.component';
import { NewWorkItemComponent } from './pages/projects/new-work-item/new-work-item.component';
import { WorkItemComponent } from './pages/projects/work-item/work-item.component';
import { TimeSheetComponent } from './pages/workSpace/time-sheet/time-sheet.component';
import { ProjectWorkItemComponent } from './pages/workSpace/project-work-item/project-work-item.component';
import { TimeLogsComponent } from './pages/workSpace/time-logs/time-logs.component';
import { ServiceRequestComponent } from './pages/workSpace/service-request/service-request.component';
import { LeaveRequestComponent } from './pages/workSpace/leave-request/leave-request.component';
import { NewLeaveRequestComponent } from './pages/workSpace/new-leave-request/new-leave-request.component';
import { NewserviceRequestComponent } from './pages/workSpace/newservice-request/newservice-request.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginformComponent },
  { path: 'forgot-password', component: ForgotPasswordformComponent },
  { path: 'home/index', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'user/details', component: DetailsComponent, canActivate: [AuthGuard] },
  { path: 'workspace/attendance', component: AttendanceComponent, canActivate: [AuthGuard] },
  { path: 'workspace/projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'workspace/timesheets/my', component: TimeSheetComponent, canActivate: [AuthGuard] },
  { path: 'project/work-group/:id', component: WorkGroupComponent, canActivate: [AuthGuard] },
  { path: 'project/project-backlog/:id', component: ProjectBacklogComponent, canActivate: [AuthGuard] },
  { path: 'project/work-backlog/:id', component: WorkBacklogComponent, canActivate: [AuthGuard] },
  { path: 'project/project-backlog/workItem/:id', component: WorkItemComponent, canActivate: [AuthGuard] },
  { path: 'project/new-work-item', component: NewWorkItemComponent, canActivate: [AuthGuard] },
  { path: 'project/update-work-item/:id', component: NewWorkItemComponent, canActivate: [AuthGuard] },
  { path: 'workspace/work-item/my', component: ProjectWorkItemComponent, canActivate: [AuthGuard] },
  { path: 'workspace/time-logs/my', component: TimeLogsComponent, canActivate: [AuthGuard] },
  { path: 'workspace/service-request/my', component: ServiceRequestComponent, canActivate: [AuthGuard] },
  { path: 'workspace/leave-request/my', component: LeaveRequestComponent, canActivate: [AuthGuard] },
  { path: 'workspace/leave-request/manage', component: NewLeaveRequestComponent, canActivate: [AuthGuard] },
  { path: 'workspace/service-request/manage', component: NewserviceRequestComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
