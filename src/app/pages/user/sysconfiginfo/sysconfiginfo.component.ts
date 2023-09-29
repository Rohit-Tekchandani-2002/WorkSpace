import { Component, OnInit } from '@angular/core';
import { systemType } from 'src/app/config/constants';
import { systemSpecificationsResponce, systemItemResponce } from 'src/app/models/user-details-model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-sysconfiginfo',
  templateUrl: './sysconfiginfo.component.html',
  styleUrls: ['./sysconfiginfo.component.css']
})
export class SysconfiginfoComponent implements OnInit {
  isAuthenticated: boolean = false;
  systemSpecifications?: systemSpecificationsResponce;
  systemItems: systemItemResponce[] = [];
  systemType: typeof systemType = systemType;
  ngOnInit(): void {
    this.checkAuthentication();
  }
  constructor(
    private authService: AuthenticationService,
    private api: UserDetailsService
  ) { }
  async checkAuthentication(): Promise<void> {
    this.isAuthenticated = await this.authService.canActivate();
    const id = localStorage.getItem('employeeId');
    if (this.isAuthenticated && id != null) {
      // Get Employee Details
      this.api.getSystemconfig(id).subscribe({
        next: (responce) => {
          if (!responce.isError) {
            this.systemSpecifications = responce.responce.systemSpecifications;
            this.systemItems = responce.responce.systemItems;
            // console.log(responce.responce);
          }
          else {
            console.log(responce.errorMessage);
          }
        },
        error: (error) => {
          console.log("Error fetching employee details: ", error);
        }
      });
    }
  }
}
