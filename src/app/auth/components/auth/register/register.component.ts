import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UserDataService} from "../../services/storage/user-data.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {

    hidePassword = true;

    registerForm!: FormGroup;

    constructor(private fb: FormBuilder,
                private auth: AuthService,
                private snackBar: MatSnackBar,
                private router: Router,
                private userDataService: UserDataService) { }

    ngOnInit(): void {
        this.registerForm = this.fb.group({
            email: [null, [Validators.required, Validators.email]],
            name: [null, [Validators.required]],
            password: [null, [Validators.required]],
            confirmPassword: [null, [Validators.required]]

        })
    }

    togglePasswordVisibility() {
        this.hidePassword = !this.hidePassword;
    }

    onSubmit() {
        console.log(this.registerForm.value)
        const password = this.registerForm.get("password")?.value;
        const confirmPassword = this.registerForm.get("confirmPassword")?.value;
        if (password !== confirmPassword) {
            this.snackBar.open("Password do not match", "Close", {duration: 5000, panelClass: "error-snackbar"})
            return;
        }

        //Collecting the email of the user who is registering
        const emailFromUser = this.registerForm.get("email")?.value;
        this.userDataService.setEmail(emailFromUser);

        this.auth.register(this.registerForm.value).subscribe((res) => {
            console.log(res)
            if (res.id != null) {
                this.snackBar.open("Registration successful, OTP send to your email", "Close", {duration: 5000})
                this.router.navigateByUrl("/verify_account");
            } else {
                this.snackBar.open("Registration failed!, Try again!.", "Close", {
                    duration: 5000,
                    panelClass: "error-snackbar"
                })
            }
        })
    }
}


