import {Component, Inject, OnInit} from '@angular/core';
import {Users} from "../services/interface/Users";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../services/controller/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

// @Component({
//     selector: 'selected-user-profile',
//     template: `
//         <div class="container mx-auto max-w-screen-lg p-4">
//             <div class="bg-gray-800 h-20 relative rounded-t-lg  shadow-lg">
//                 <div class="absolute bottom-0 left-6 transform translate-y-1/2">
//                     <div class="w-32 h-32 rounded-full border-4 border-blue-500 overflow-hidden shadow-lg">
//                         <img [src]="user.profilePic" alt="User Profile Picture" class="w-full h-full object-cover">
//                     </div>
//                 </div>
//             </div>
//             <div class="bg-gray-950 rounded-b-lg shadow-lg border-t border-neutral-700 p-6">
//                 <div class="text-center mt-16">
//                     <div class="flex flex-col items-center">
//                         <p class="text-white text-3xl font-bold">{{ user.name }}</p>
//                         <p class="text-md text-neutral-500">{{ user.email }}</p>
//                     </div>
//                     <div class="mt-4">
//                         <p class="text-white text-sm">{{ user.bio }}</p>
//                     </div>
//                     <div class="mt-6 flex justify-center space-x-4">
//                         <button
//                             [ngClass]="{'bg-blue-500 hover:bg-blue-600': !isFollowed,'bg-green-500 hover:bg-green-600': isFollowed}"
//                             class="text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                             (click)="toggleConnection()">
//                             {{ isFollowed ? 'Followed' : 'Follow' }}
//                         </button>
//                     </div>
//                 </div>
//             </div>
//
//         </div>
//     `
// })
// export class SelectedUserProfileComponent implements OnInit {
//
//     user: Users;
//
//     selectedUserId!: number;
//
//     isFollowed: boolean = false;
//
//     constructor(public dialogRef: MatDialogRef<SelectedUserProfileComponent>,
//                 @Inject(MAT_DIALOG_DATA) public data: Users,
//                 private userService: UserService,
//                 private snackBar: MatSnackBar) {
//         this.user = data;
//         this.selectedUserId = this.user.id;
//     }
//
//     ngOnInit(): void {
//     }
//
//     closeDialog(): void {
//         this.dialogRef.close();
//     }
//
//     toggleConnection() {
//         this.userService.followUser(this.selectedUserId).subscribe({
//             next: (response) => {
//                 console.log(response);
//                 this.snackBar.open("User followed successfully", "Close", {duration: 500});
//             },error(err: Error) {
//                 this.snackBar.open("User followed failed", "Close", {duration: 500});
//                 // console.error('Error following user:', err);
//             }
//         })
//         this.isFollowed = !this.isFollowed;
//     }
//
// }


@Component({
    selector: 'selected-user-profile',
    template: `
        <div class="container mx-auto max-w-screen-lg p-4">
            <div class="bg-gray-800 h-20 relative rounded-t-lg shadow-lg">
                <div class="absolute bottom-0 left-6 transform translate-y-1/2">
                    <div class="w-32 h-32 rounded-full border-4 border-blue-500 overflow-hidden shadow-lg">
                        <img [src]="user.profilePic" alt="User Profile Picture" class="w-full h-full object-cover">
                    </div>
                </div>
            </div>
            <div class="bg-gray-950 rounded-b-lg shadow-lg border-t border-neutral-700 p-6">
                <div class="text-center mt-16">
                    <div class="flex flex-col items-center">
                        <p class="text-white text-3xl font-bold">{{ user.name }}</p>
                        <p class="text-md text-neutral-500">{{ user.email }}</p>
                    </div>
                    <div class="mt-4">
                        <p class="text-white text-sm">{{ user.bio }}</p>
                    </div>
                    <div class="mt-6 flex justify-center space-x-4">
                        <button
                            [ngClass]="{'bg-blue-500 hover:bg-blue-600': !isFollowed,'bg-green-500 hover:bg-green-600': isFollowed}"
                            class="text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            (click)="toggleConnection()">
                            {{ isFollowed ? 'Followed' : 'Follow' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class SelectedUserProfileComponent implements OnInit {

    user: Users;
    selectedUserId!: number;
    isFollowed: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<SelectedUserProfileComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Users,
        private userService: UserService,
        private snackBar: MatSnackBar
    ) {
        this.user = data;
        this.selectedUserId = this.user.id;
    }

    ngOnInit(): void {
        this.checkFollowStatus();
    }

    closeDialog(): void {
        this.dialogRef.close();
    }

    // Use the method provided to check if the user is already followed
    checkFollowStatus(): void {
        this.userService.checkIfFollowed(this.selectedUserId).subscribe({
            next: (isFollowedResponse: boolean) => {
                this.isFollowed = isFollowedResponse;
            },
            error: (err) => {
                console.error("Error checking follow status:", err);
            }
        });
    }

    toggleConnection() {
        if (this.isFollowed) {
            this.userService.unfollowUser(this.selectedUserId).subscribe({
                next: () => {
                    this.isFollowed = false;
                    this.snackBar.open("User unfollowed successfully", "Close", {duration: 500});
                },
                error: (err: Error) => {
                    this.snackBar.open("Failed to unfollow user", "Close", {duration: 500});
                    console.error("Error unfollowing user:", err);
                }
            });
        } else {
            this.userService.followUser(this.selectedUserId).subscribe({
                next: () => {
                    this.isFollowed = true;
                    this.snackBar.open("User followed successfully", "Close", {duration: 500});
                },
                error: (err: Error) => {
                    this.snackBar.open("Failed to follow user", "Close", {duration: 500});
                    console.error("Error following user:", err);
                }
            });
        }
    }
}
