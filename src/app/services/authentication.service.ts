import { Injectable } from '@angular/core';
import { AuthGuard } from '../shared/auth.guard';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private authGuard: AuthGuard) { }

  canActivate(): Promise<boolean> {
    return this.authGuard.canActivate();
  }
  
}
