import { Injectable, NgZone } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth/auth.service";
import {environment} from "../../../../../environments/environment";

declare const google: any;

@Injectable({
    providedIn: 'root'
})
export class GoogleOAuthService {

    private googleInitialized = new BehaviorSubject<boolean>(false);

    constructor(private ngZone: NgZone,
                private router: Router,
                private snackBar: MatSnackBar,
                private authService: AuthService) { }

    initializeGoogleSignIn(): void {
        if (google) {
            google.accounts.id.initialize({
                client_id: environment.googleClientId,
                callback: (response: any) => this.ngZone.run(() => this.handleLogin(response))
            });

            google.accounts.id.renderButton(
                document.getElementById("google-btn")!,
                {
                    theme: 'filled_white',
                    size: 'large',
                    text: 'signin_with',
                    shape: 'rectangular'
                }
            );

            this.googleInitialized.next(true);
        } else {
            console.error('Google accounts API is not available.');
            this.googleInitialized.next(false);
        }
    }

    handleLogin(response: any) {
        if (response) {
            const id_token = response.credential;
            const result = this.decodeToken(id_token);
            console.log(result)
            this.authService.googleLogin({ data: result }).subscribe({
                next: (res: any) => {
                    localStorage.setItem('jwtToken', res.token);
                    localStorage.setItem('userRole', res.role)
                    this.snackBar.open('Google Sign-In Success', 'Success', {
                        duration: 3000,
                    })
                    this.router.navigateByUrl('/user');
                },
                error:() => {
                    this.snackBar.open('Google Sign-In Failed', 'Error', {
                        duration: 3000,
                        panelClass: 'app-notification-error'
                    });
                }
            });
        }
    }

    private decodeToken(token: string): any {
        return JSON.parse(atob(token.split(".")[1]));
    }

    getGoogleInitialized(): Observable<boolean> {
        return this.googleInitialized;
    }
}
