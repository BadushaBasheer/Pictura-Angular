import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/components/services/auth/auth.service";
import {UserService} from "../services/controller/user.service";
import {Users} from "../services/interface/Users";
import {map, tap} from "rxjs/operators";
import {catchError, forkJoin, of} from "rxjs";
import {AddPostComponent} from "../add-post/add-post.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-follow-bar',
    template: `
        <div class="px-6 py-10 hidden lg:block xl:w-96">
            <!--post button-->
            <div class="mt-auto mb-10">
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

            <div class="bg-gray-900 rounded-lg shadow-lg p-6">
                <h2 class="text-blue-400 text-2xl font-medium mb-4">People You May Know</h2>
                <div class="flex flex-col gap-4">
                    <div class="flex justify-center items-center" *ngIf="!users.length">
                        <loader class="w-12 h-12 text-blue-400 animate-spin"/>
                    </div>
                    <ng-container *ngFor="let user of users">
                        <a
                           class="hover:bg-gray-800 rounded-lg transition duration-200 ease-in-out">
                            <div class="flex items-center gap-4 p-4 hover:bg-gray-700 rounded-lg">
                                <!-- Avatar -->
<!--                                <Avatar class="w-13 h-13 rounded-full border-2 border-blue-500"/>-->
                                <div class="w-13 h-13 rounded-full border-2 border-blue-500">
                                    <img [src]="user.profilePic" alt="User Posts" class="w-full h-fit"/>
                                </div>
                                <div class="flex flex-1 justify-between items-center">
                                    <p class="text-white font-mono text-lg">
                                        {{ user.name }}
                                    </p>
                                    <button (click)="followUser(user.id)" matTooltip="Follow" mat-icon-button
                                            class="text-blue-500 hover:bg-blue-600 rounded-full p-2 transition duration-150 ease-in-out">
                                        <mat-icon class="text-white">person_add</mat-icon>
                                    </button>
                                </div>
                            </div>
                        </a>
                    </ng-container>
                </div>
            </div>
        </div>
    `
})
export class FollowBarComponent implements OnInit {
    users: Users[] = [];

    constructor(public auth: AuthService, private userService: UserService, private snackBar: MatSnackBar, private dialog: MatDialog,) {
    }

    ngOnInit(): void {
        this.fetchUsers();
    }

    fetchUsers() {
        forkJoin({
            allUsers: this.userService.getAllUsers(),
            authenticatedUser: this.userService.getAuthenticatedUser()
        }).pipe(
            map(({allUsers, authenticatedUser}) => {
                const filteredUsers = allUsers.filter(user => user.name !== authenticatedUser.name);
                return this.getRandomUsers(filteredUsers, 4);
            })
        ).subscribe({
            next: (randomUsers) => this.users = randomUsers,
            error: (err) => {
                this.snackBar.open('Failed to fetch users', 'Close', {duration: 500});
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
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }


    followUser(userId: number) {
        // const isAlreadyFollowedUser = this.userService.checkIfFollowed(userId);
        // if (!isAlreadyFollowedUser) {
            this.userService.followUser(userId).pipe(
                tap(response => {
                    console.log('User followed successfully:', response);
                }),
                catchError(error => {
                    console.error('Error following user:', error);
                    return of(null);
                })
            ).subscribe();
        // } else {
        //     console.log('User is already followed.');
        // }
    }


}
