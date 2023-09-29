import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsService } from '../services/accounts.service';
import { refershRequest } from '../models/accounts-model';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard{

    constructor(private authService: AccountsService, private router: Router) { }
    async canActivate(): Promise<boolean> {
        if (this.isLoggedIn()) {
            console.log(localStorage.getItem("token"));
            return true;
        }
        else {
            var refershExpiryTime = new Date(localStorage.getItem('refreshTokenExpiryTime') ?? '');
            const currentTime = new Date();
            const isValid = await this.IsrefershtokenValid();
            var rememberMe = localStorage.getItem('rememberMe') === 'true';
            // console.log("rememberMe: ", rememberMe);
            if (refershExpiryTime > currentTime && isValid && rememberMe) {
                return true;
            }
            else {
                alert("You've been logged out, Please login!");
                this.router.navigate(['/login']);
                return false;
            }
        }
        return true;
    }

    isLoggedIn(): boolean {
        var token = localStorage.getItem('token');
        var tokenExpiryTime = new Date(localStorage.getItem('tokenExpiryTime') ?? '');
        var refershExpiryTime = new Date(localStorage.getItem('refreshTokenExpiryTime') ?? '');
        const currentTime = new Date();
        // console.log("Token Expiery Time", tokenExpiryTime, '\n', "Refersh Expiery Time: ", refershExpiryTime, '\n', "Current Time: ", currentTime);
        if (token == null || tokenExpiryTime < currentTime) {
            return false;
        }
        return true;
    }

    request: refershRequest = { refershToken: '' };

    async IsrefershtokenValid(): Promise<boolean> {
        return await new Promise<boolean>((resolve, reject) => {
            var refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken != null && refreshToken != '') {
                this.request.refershToken = refreshToken as string;
                this.authService.refreshToken(this.request).subscribe({
                    next: (response) => {
                        if (response.isError == false) {
                            localStorage.setItem("token", response.responce.token);
                            localStorage.setItem("refreshToken", response.responce.refreshToken);
                            localStorage.setItem("tokenExpiryTime", response.responce.tokenExpiryTime);
                            localStorage.setItem("refreshTokenExpiryTime", response.responce.refreshTokenExpiryTime);
                            localStorage.setItem("employeeId", response.responce.employeeId);
                            resolve(true);
                        } else {
                            console.log(response.errorMessage);
                            resolve(false);
                        }
                    },
                    error: (error) => {
                        console.log("status: " + error.status + "\nError: " + error.error.errorMessage);
                        resolve(false);
                    }
                });
            } else {
                resolve(false);
            }
        });
    }

}
