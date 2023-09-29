import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginRequest } from 'src/app/models/accounts-model';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {

  rememberMe: boolean = localStorage.getItem('rememberMe') === 'true';

  constructor(private formBuilder: FormBuilder, private router: Router, private api: AccountsService) { }


  loginFrom = this.formBuilder.group(
    {
      userName: ['', Validators.required],
      passWord: ['', Validators.required],
      rememberMe: Boolean(this.rememberMe)
    }
  );

  request: loginRequest =
    {
      userName: '',
      password: ''
    };

  ngOnInit(): void {

  }

  onSubmit() {
    this.request.userName = this.loginFrom.value.userName as string;
    this.request.password = this.loginFrom.value.passWord as string;
    this.api.userLogin(this.request).subscribe({
      next: responce => {
        // console.log(responce);
        if (responce.isError == false) {
          localStorage.clear();
          localStorage.setItem("token", responce.responce.token);
          localStorage.setItem("refreshToken", responce.responce.refreshToken);
          localStorage.setItem("tokenExpiryTime", responce.responce.tokenExpiryTime);
          localStorage.setItem("refreshTokenExpiryTime", responce.responce.refreshTokenExpiryTime);
          localStorage.setItem("employeeId", responce.responce.employeeId);
          localStorage.setItem("rememberMe", String(this.loginFrom.value.rememberMe ?? false));
          this.router.navigate(['home/index']);
        } else {
          alert(responce.errorMessage);
        }
      },
      error: (error) => {
        // console.log(error);
        alert("status: " + error.status + "\nError: " + error.error.errorMessage);
      }
    });
  }
}
