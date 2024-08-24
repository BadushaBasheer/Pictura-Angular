import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../services/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {GoogleOAuthService} from "./oauth2/GoogleOAuthService";
import {StorageService} from "../../services/storage/storage.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

    loginForm!: FormGroup;
    hidePassword = true;
    errors: any = {};

    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private snackBar: MatSnackBar,
        private router: Router,
        private googleOAuthService: GoogleOAuthService) {
    }

    togglePasswordVisibility(): void {
        this.hidePassword = !this.hidePassword;
    }

    ngOnInit(): void {
        this.googleOAuthService.getGoogleInitialized().subscribe(initialized => {
            if (initialized) {
                console.log('Google Sign-In is initialized.');
            } else {
                console.error('Google Sign-In initialization failed.');
            }
        });

        this.googleOAuthService.initializeGoogleSignIn();

        this.loginForm = this.fb.group({
            email: [null, [Validators.email, Validators.required]],
            password: [null, [Validators.required]]
        });
        this.loginForm.get('email')?.valueChanges.subscribe(value =>{
            if (value) {
                const lowerCaseEmail = value.toLowerCase();
                this.loginForm.get('email')?.setValue(lowerCaseEmail, {emitEvent: false});
            }
        })
    }

    submitLoginForm(): void {
        if (this.loginForm.invalid) {
            Object.values(this.loginForm.controls).forEach(control => {
                if (control instanceof FormControl) {
                    control.markAsDirty();
                    control.updateValueAndValidity();
                }
            });
            return;
        }

        this.auth.login(this.loginForm.value).subscribe({
            next: (res) => {
                console.log('Login Response:', res);

                if (res.userId != null) {
                    const user = {
                        id: res.userId,
                        role: res.userRole,
                    };

                    console.log('user role :', res.userRole);
                    console.log('User:', user);
                    StorageService.saveUser(user);

                    const token = res.token;
                    console.log('JWT Token:', token);
                    StorageService.saveToken(token);

                    const refreshToken = res.refreshToken;
                    console.log('JWT Refresh Token:', refreshToken);
                    StorageService.saveToken(refreshToken);

                    if (StorageService.isAdminLoggedIn()) {
                        this.router.navigateByUrl('/admin');
                    } else if (StorageService.isUserLoggedIn()) {
                        this.router.navigateByUrl('/user');
                    }

                    this.snackBar.open("Login successful", "Close", {duration: 3000});
                } else {
                    this.snackBar.open("Invalid credentials.", "Close", {duration: 3000, panelClass: "error-snackbar"});
                }
            },
            error: (err) => {
                console.error('Login Error:', err);
                // this.snackBar.open("An error occurred. Please try again.", "Close", { duration: 5000, panelClass: "error-snackbar" });
                if (err.status === 400 && err.error) {
                    this.errors = err.error;
                    } else {
                    this.snackBar.open('An error occurred. Please try again.', 'Close', {
                        duration: 5000,
                        panelClass: 'error-snackbar',
                    });
                }
            }
        });
    }


    register() {
        this.router.navigate(['register']).then(success => {
            if (success) {
                console.log('Navigation was successful!');
            } else {
                console.log('Navigation failed!');
            }
        }).catch(error => {
            console.error('Navigation error:', error);
        });
    }

}
