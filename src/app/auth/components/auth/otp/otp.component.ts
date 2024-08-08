// import { Component } from '@angular/core';
// import {Router} from "@angular/router";
// import {AuthService} from "../../services/auth/auth.service";
// import {MatSnackBar} from "@angular/material/snack-bar";
//
// @Component({
//   selector: 'app-otp',
//   templateUrl: './otp.component.html',
//   styleUrls: ['./otp.component.scss']
// })
// export class OtpComponent {
//
//     message = '';
//     isOkay = true;
//     submitted = false;
//
//     constructor(private router: Router,
//                 private authService: AuthService,
//                 private snackBar: MatSnackBar) {}
//
//     private confirmAccount(token: string) {
//         this.authService.verifyAccount(token).subscribe({
//             next: () => {
//                 this.message = 'Your account has been successfully activated.\nNow you can proceed to login';
//                 this.submitted = true;
//                 this.openSnackBar(this.message, 'Close', 'success-snackbar');
//             },
//             error: () => {
//                 this.message = 'Token has expired or is invalid';
//                 this.submitted = true;
//                 this.isOkay = false;
//                 this.openSnackBar(this.message, 'Close', 'error-snackbar');
//             }
//         });
//     }
//
//     redirectToLogin() {
//         this.router.navigate(['login']);
//     }
//
//     onCodeCompleted(token: string) {
//         this.confirmAccount(token);
//     }
//
//     openSnackBar(message: string, action: string, className: string) {
//         this.snackBar.open(message, action, {
//             duration: 3000,
//             panelClass: [className]
//         });
//     }
// }


// import {Component} from '@angular/core';
// import {Router} from "@angular/router";
// import {AuthService} from "../../services/auth/auth.service";
// import {MatSnackBar} from "@angular/material/snack-bar";
// import {UserDataService} from "../../services/storage/user-data.service";
//
// @Component({
//     selector: 'app-otp',
//     templateUrl: './otp.component.html',
//     styleUrls: ['./otp.component.scss']
// })
// export class OtpComponent {
//
//     message = '';
//     isOkay = true;
//     submitted = false;
//     isResending = false;
//     resendTimer = 0;
//     resendCooldown = 30;  // Cooldown period in seconds
//     email: string | null = this.userDataService.getEmail();
//
//     constructor(private router: Router,
//                 private authService: AuthService,
//                 private snackBar: MatSnackBar,
//                 private userDataService: UserDataService) {
//     }
//
//     private confirmAccount(token: string) {
//         this.authService.verifyAccount(token).subscribe({
//             next: () => {
//                 this.message = 'Your account has been successfully activated. Now you can proceed to login';
//                 this.submitted = true;
//                 this.openSnackBar(this.message, 'Close', 'success-snackbar');
//             },
//             error: () => {
//                 this.message = 'Token has expired or is invalid';
//                 this.submitted = true;
//                 this.isOkay = false;
//                 this.openSnackBar(this.message, 'Close', 'error-snackbar');
//             }
//         });
//     }
//
//     redirectToLogin() {
//         this.router.navigate(['login']);
//     }
//
//     onCodeCompleted(token: string) {
//         this.confirmAccount(token);
//     }
//
//     openSnackBar(message: string, action: string, className: string) {
//         this.snackBar.open(message, action, {
//             duration: 3000,
//             panelClass: [className]
//         });
//     }
//
//     resendCode() {
//         if (this.resendTimer > 0) {
//             return;  // Prevent resending if the timer is still active
//         }
//
//         if (this.email === null) {
//             this.openSnackBar('Email address is not available. Please try again later.', 'Close', 'error-snackbar');
//             return;
//         }
//
//         this.isResending = true;
//         this.authService.resendOtp(this.email).subscribe({
//             next: () => {
//                 this.isResending = false;
//                 this.openSnackBar('OTP has been resent to your email.', 'Close', 'success-snackbar');
//                 this.startResendTimer();
//             },
//             error: (err) => {
//                 this.isResending = false;
//                 this.openSnackBar('Failed to resend OTP. ' + err.error, 'Close', 'error-snackbar');
//             }
//         });
//     }
//
//
//
//     startResendTimer() {
//         this.resendTimer = this.resendCooldown;
//         const intervalId = setInterval(() => {
//             this.resendTimer--;
//             if (this.resendTimer <= 0) {
//                 clearInterval(intervalId);
//             }
//         }, 1000);
//     }
// }


// otp.component.ts
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserDataService } from "../../services/storage/user-data.service";

@Component({
    selector: 'app-otp',
    templateUrl: './otp.component.html',
    styleUrls: ['./otp.component.scss']
})
export class OtpComponent {

    message = '';
    isOkay = true;
    submitted = false;
    isResending = false;
    resendTimer = 0;
    resendCooldown = 30;  // Cooldown period in seconds
    email: string | null = this.userDataService.getEmail();

    constructor(private router: Router,
                private authService: AuthService,
                private snackBar: MatSnackBar,
                private userDataService: UserDataService) {}

    private confirmAccount(token: string) {
        this.authService.verifyAccount(token).subscribe({
            next: () => {
                this.message = 'Your account has been successfully activated. Now you can proceed to login';
                this.submitted = true;
                this.openSnackBar(this.message, 'Close', 'success-snackbar');
            },
            error: () => {
                this.message = 'Token has expired or is invalid';
                this.submitted = true;
                this.isOkay = false;
                this.openSnackBar(this.message, 'Close', 'error-snackbar');
            }
        });
    }

    redirectToLogin() {
        this.router.navigate(['login']);
    }

    onCodeCompleted(token: string) {
        this.confirmAccount(token);
    }

    openSnackBar(message: string, action: string, className: string) {
        this.snackBar.open(message, action, {
            duration: 3000,
            panelClass: [className]
        });
    }

    resendCode() {
        if (this.resendTimer > 0) {
            return;  // Prevent resending if the timer is still active
        }

        if (this.email === null) {
            this.openSnackBar('Email address is not available. Please try again later.', 'Close', 'error-snackbar');
            return;
        }

        this.isResending = true;
        this.authService.resendOtp(this.email).subscribe({
            next: () => {
                this.isResending = false;
                this.openSnackBar('OTP has been resent to your email.', 'Close', 'success-snackbar');
                this.startResendTimer();
            },
            error: (err) => {
                this.isResending = false;
                this.openSnackBar('Failed to resend OTP. ' + err.error, 'Close', 'error-snackbar');
            }
        });
    }

    startResendTimer() {
        this.resendTimer = this.resendCooldown;
        const intervalId = setInterval(() => {
            this.resendTimer--;
            if (this.resendTimer <= 0) {
                clearInterval(intervalId);
            }
        }, 1000);
    }
}
