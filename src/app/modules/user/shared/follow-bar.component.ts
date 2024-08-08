import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../auth/components/services/auth/auth.service";
import { UserService } from "../services/controller/user.service";
import { Users } from "../services/interface/Users";
import {map} from "rxjs/operators";
import {forkJoin} from "rxjs";
import {AddPostComponent} from "../add-post/add-post.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-follow-bar',
    template: `
        <div class="px-6 py-10 hidden lg:block xl:w-96">
            <div class="bg-neutral-800 rounded-xl p-4">
                <h2 class="text-blue-500 text-xl font-thin">People you may know.</h2>
                <div class="flex flex-col gap-6 mt-5">
                    <div class="flex justify-center align-middle" *ngIf="!users.length">
                        <loader/>
                    </div>
                    <ng-container *ngFor="let user of users">
                        <a routerLink="/user/{{ user.id }}">
                            <div class="flex flex-row gap-4 items-center">
                                <!-- Avatar -->
                                <Avatar/>
                                <div class="flex flex-row items-center gap-36">
                                    <p class="text-white font-semibold text-sm pt-2">
                                        {{ user.name }}
                                    </p>
                                    <button mat-icon-button>
                                        <mat-icon color="primary" matTooltip="follow">person_add</mat-icon>
                                    </button>
                                </div>
                            </div>
                        </a>
                    </ng-container>
                </div>
            </div>
            <!--post button-->
            <div class="mt-auto">
                <div
                    (click)="openPostModal()"
                    class="material-icons lg:hidden h-14 w-14 rounded-full p-4 flex items-center justify-center bg-gray-600 hover:bg-opacity-80 transition cursor-pointer">
                    <span class="material-symbols-outlined text-white">add_a_photo</span>
                </div>
                <!-- Posts button for large screens -->
                <div
                    (click)="openPostModal()"
                    class="material-icons border-2 border-white rounded-lg hidden lg:flex items-center justify-center gap-2 px-2 py-2 bg-gray-800 hover:bg-opacity-90 transition cursor-pointer">
                    <span class="material-symbols-outlined text-white">add_photo_alternate</span>
                    <p class="text-white text-center font-light text-[15px] pt-[10px]">
                        CREATE POST
                    </p>
                </div>
            </div>
        </div>
    `
})
export class FollowBarComponent implements OnInit {
    users: Users[] = [];

    constructor(public auth: AuthService, private userService: UserService,private snackBar: MatSnackBar, private dialog: MatDialog,) {}

    ngOnInit(): void {
        forkJoin({
            allUsers: this.userService.getAllUsers(),
            authenticatedUser: this.userService.getAuthenticatedUser()
        }).pipe(
            map(({ allUsers, authenticatedUser }) => {
                const filteredUsers = allUsers.filter(user => user.name !== authenticatedUser.name);
                return this.getRandomUsers(filteredUsers, 4);
            })
        ).subscribe({
            next: (randomUsers) => this.users = randomUsers,
            error: (err) => {
                this.snackBar.open('Failed to fetch users', 'Close', { duration: 500 });
                console.error('Failed to fetch users', err);
            }
        });
    }

    getRandomUsers(users: Users[], count: number): Users[] {
        const shuffled = users.sort(() => 0.5 - Math.random()); // Shuffle the array
        return shuffled.slice(0, count); // Return the specified number of items
    }

    openPostModal() {
        const dialogRef = this.dialog.open(AddPostComponent, {width: '600px'});
        dialogRef.afterClosed().subscribe(result => {console.log(`Dialog result: ${result}`);});
    }
}
