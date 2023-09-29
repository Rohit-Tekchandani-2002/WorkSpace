import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './shared/materialModule';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CarouselModule } from '@coreui/angular';
import { LoginformComponent } from './components/loginform/loginform.component';
import { ForgotPasswordformComponent } from './components/forgot-passwordform/forgot-passwordform.component';
import { DashboardComponent } from './pages/home/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { NewsDialogComponent } from './components/news-dialog/news-dialog.component';
import { DetailsComponent } from './pages/user/details/details.component';
import { PersonalDetailsComponent } from './pages/user/personal-details/personal-details.component';
import { SysconfiginfoComponent } from './pages/user/sysconfiginfo/sysconfiginfo.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AttendanceComponent } from './pages/workSpace/attendance/attendance.component';
import { AlertComponent } from './components/alert/alert.component';
import { ProjectsComponent } from './pages/workSpace/projects/projects.component';
import { WorkGroupComponent } from './pages/projects/work-group/work-group.component';
import { WorkHistoryDialogComponent } from './components/work-history-dialog/work-history-dialog.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { ProjectBacklogComponent } from './pages/projects/project-backlog/project-backlog.component';
import { WorkBacklogComponent } from './pages/projects/work-backlog/work-backlog.component';
import { UpdateWorklogDialogComponent } from './components/update-worklog-dialog/update-worklog-dialog.component';
import { NewWorkItemComponent } from './pages/projects/new-work-item/new-work-item.component';
import { WorkItemComponent } from './pages/projects/work-item/work-item.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { DeleteItemComponent } from './components/delete-item/delete-item.component';
import { UpdateProjectItemWorklogComponent } from './components/update-project-item-worklog/update-project-item-worklog.component';
import { AddAttachmentsComponent } from './components/add-attachments/add-attachments.component';
import { UndoDialogComponent } from './components/undo-dialog/undo-dialog.component';
import { TeamRosterDetailsComponent } from './components/team-roster-details/team-roster-details.component';
import { ActivityStreamComponent } from './components/activity-stream/activity-stream.component';
import { ProjectWorkGroupLogsTableComponent } from './components/project-work-group-logs-table/project-work-group-logs-table.component';
import { TimeSheetComponent } from './pages/workSpace/time-sheet/time-sheet.component';
import { KeysPipe } from './pipes/keys.pipe';
import { ProjectWorkItemComponent } from './pages/workSpace/project-work-item/project-work-item.component';
import { TimeLogsComponent } from './pages/workSpace/time-logs/time-logs.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LeaveRequestComponent } from './pages/workSpace/leave-request/leave-request.component';
import { ServiceRequestComponent } from './pages/workSpace/service-request/service-request.component';
import { NewLeaveRequestComponent } from './pages/workSpace/new-leave-request/new-leave-request.component';
import { NewserviceRequestComponent } from './pages/workSpace/newservice-request/newservice-request.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    LoginformComponent,
    ForgotPasswordformComponent,
    DashboardComponent,
    SideBarComponent,
    NewsDialogComponent,
    DetailsComponent,
    PersonalDetailsComponent,
    SysconfiginfoComponent,
    AttendanceComponent,
    AlertComponent,
    ProjectsComponent,
    WorkGroupComponent,
    WorkHistoryDialogComponent,
    ProjectBacklogComponent,
    WorkBacklogComponent,
    UpdateWorklogDialogComponent,
    NewWorkItemComponent,
    WorkItemComponent,
    DeleteItemComponent,
    UpdateProjectItemWorklogComponent,
    AddAttachmentsComponent,
    UndoDialogComponent,
    TeamRosterDetailsComponent,
    ActivityStreamComponent,
    ProjectWorkGroupLogsTableComponent,
    TimeSheetComponent,
    KeysPipe,
    ProjectWorkItemComponent,
    TimeLogsComponent,
    LeaveRequestComponent,
    ServiceRequestComponent,
    NewLeaveRequestComponent,
    NewserviceRequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TooltipModule,
    AngularEditorModule,
    NgbModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}, //Date format
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
