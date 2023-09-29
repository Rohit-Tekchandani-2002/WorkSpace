import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-forgot-passwordform',
  templateUrl: './forgot-passwordform.component.html',
  styleUrls: ['./forgot-passwordform.component.css']
})
export class ForgotPasswordformComponent {
  
  public loading$ = new BehaviorSubject<boolean>(false);
  
  constructor(private formBuilder: FormBuilder, private api: AccountsService) { }
  
  forgotPasswordFrom = this.formBuilder.group(
    {
      userName: ''
    }
  );
  onSubmit() {
    this.loading$.next(true);
    this.api.forgotPassword(this.forgotPasswordFrom.value.userName).subscribe({
      next: response => {
        if (response.isError == false) {
          alert(response.responce);
          this.forgotPasswordFrom.reset();
        }
        else{
          alert(response.errorMessage);
        }
      },
      error : (error) => {
        alert("Error: " + error.error.errorMessage);
      },
      complete : () => {
        this.loading$.next(false);
      }
    });
  }
}
