import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/controller/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styles: [`
        .mat-accordion .mat-expansion-panel {
            color: white !important;
            background-color: black !important;
            border: 1px solid white !important;
        }

        .mat-accordion .mat-expansion-panel-header .mat-expansion-panel-header-title {
            color: white !important;
        }

    `]
})

export class SettingsComponent implements OnInit {
    isPrivate: boolean = true;
    accountType!: string;

    constructor(
        private userService: UserService,
        private snackBar: MatSnackBar
    ) {}


    ngOnInit() {
        this.accountTypeFetch();
    }

    accountTypeFetch() {
        this.userService.getAuthenticatedUser().subscribe({
            next: (response) => {
                try {
                    this.accountType = response.accountType;
                    this.isPrivate = this.accountType === 'PRIVATE';
                } catch (error) {
                    console.error('Failed to parse response:', error, response);
                    this.snackBar.open('Invalid response format from server', 'Close', {
                        duration: 5000,
                    });
                }
            },
            error: (error) => {
                console.error('Error fetching account type:', error);
                this.snackBar.open('Error fetching account type', 'Close', {
                    duration: 5000,
                });
            }
        });
    }

    togglePrivacy() {
        this.userService.updateUserAccountType().subscribe({
            next: (response: string) => {
                console.log('Response from server:', response);
                if (response.includes('Account type updated successfully')) {
                    this.isPrivate = !this.isPrivate;
                    this.snackBar.open('Account status changed successful', 'Close', {
                        duration: 3000,
                    });
                } else {
                    this.snackBar.open('Unexpected response from server', 'Close', {
                        duration: 3000,
                    });
                }
            },
            error: (error) => {
                console.error('Error occurred:', error);
                this.snackBar.open('Error occurred', 'Close', {
                    duration: 5000,
                });
            }
        });
    }

}
