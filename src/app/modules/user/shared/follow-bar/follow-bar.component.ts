import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../auth/components/services/auth/auth.service";
import {UserService} from "../../services/controller/user.service";
import {Users} from "../../services/interface/Users";
import {map, tap} from "rxjs/operators";
import {catchError, forkJoin, of} from "rxjs";
import {AddPostComponent} from "../../add-post/add-post.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SelectedUserProfileComponent} from "../../selected-user-profile/selected-user-profile.component";

@Component({
    selector: 'app-follow-bar',
    templateUrl:'follow-bar.component.html'
})
export class FollowBarComponent implements OnInit {

    users: Users[] = [];

    constructor(public auth: AuthService,
                private userService: UserService,
                private snackBar: MatSnackBar,
                private dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.fetchUsers();
    }

    fetchUsers() {
        forkJoin({
            allUsers: this.userService.getSuggestions(),
            authenticatedUser: this.userService.getAuthenticatedUser()
        }).pipe(
            map(({allUsers, authenticatedUser}) => {
                const filteredUsers = allUsers.filter(user => user.name !== authenticatedUser.name);
                return this.getRandomUsers(filteredUsers, 4);
            })
        ).subscribe({
            next: (randomUsers) => this.users = randomUsers,
            error: (err) => {
                this.snackBar.open('Failed to fetch users', 'Close', {duration: 3000});
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
        this.userService.followUser(userId).pipe(
            tap(response => {
                console.log('User followed successfully:', response);
                this.snackBar.open('User followed successfully', 'Close', {duration: 500});
            }),
            catchError(error => {
                console.error('Error following user:', error);
                return of(null);
            })
        ).subscribe();
    }


    // selectedUser(user: Users) {
    //     const userId = user.id;
    //     const userName = user.name;
    //     this.router.navigate(['/user', userId]);
    //     console.log("The clicked user id and name : ", userId, userName)
    // }

    selectedUser(user: Users) {
        this.dialog.open(SelectedUserProfileComponent, {
            width: '500px',
            data: user
        });
    }

}
