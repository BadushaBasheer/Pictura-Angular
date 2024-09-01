import { Component, Input, OnInit } from '@angular/core';
import {UserService} from "../services/controller/user.service";
import {Users} from "../services/interface/Users";
import {catchError, of} from "rxjs";
import {tap} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit {

    user!: Users;
    wordCount: number = 0;
    maxWords: number = 20;
    selectedProfileFile: File | null = null;
    selectedCoverFile: File | null = null;

    constructor(private userService: UserService, private snackBar: MatSnackBar) {}

    ngOnInit(): void { this.loadUserData(); }

    loadUserData(): void {
        this.userService.getAuthenticatedUser().pipe(
            catchError((error) => {
                console.error('Error loading user data', error);
                return of(null);
            })
        ).subscribe(
            (response: Users | null) => {
                if (response) {
                    this.user = response;
                    this.updateWordCount();
                }
            }
        );
    }

    onFileSelected(event: any, type: string): void {
        const file: File = event.target.files[0];
        if (type === 'profile') {
            this.selectedProfileFile = file;
        } else if (type === 'cover') {
            this.selectedCoverFile = file;
        }
    }

    onSubmit(): void {
        const formData = new FormData();
        formData.append('name', this.user.name);
        formData.append('bio', this.user.bio);

        if (this.selectedProfileFile) {
            formData.append('profilePic', this.selectedProfileFile);
        }

        if (this.selectedCoverFile) {
            formData.append('backgroundImage', this.selectedCoverFile);
        }

        this.userService.updateUser(formData).pipe(
            tap(response => {
                console.log('User updated successfully', response);
                this.snackBar.open('Your profile has been updated!', 'Close', { duration: 5000 });
            }),
            catchError(error => {
                console.error('Error updating user', error);
                this.snackBar.open('Oops! Something went wrong. Couldn\'t update your information.', 'Close', { duration: 5000 });
                return of(null);
            })
        ).subscribe();
    }

    onBioChange(): void { this.updateWordCount(); }
    private updateWordCount(): void {
        const words = this.user.bio.trim().split(/\s+/);
        this.wordCount = words.length;
        if (this.wordCount > this.maxWords) {
            this.user.bio = words.slice(0, this.maxWords).join(' ');
            this.wordCount = this.maxWords;
        }
    }
}
