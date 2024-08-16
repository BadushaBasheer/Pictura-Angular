import {Component, NgIterable, OnInit} from '@angular/core';
import {Users} from "../../services/interface/Users";
import {UserService} from "../../services/controller/user.service";
import {tap} from "rxjs/operators";
import {catchError, of} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html'
})
// export class MessagesComponent implements OnInit{
//
//     selectedUserId!: number;
//
//     followedUsers: Users[] = [];
//
//     constructor(private userService: UserService, private router: Router) { }
//
//     ngOnInit(): void { this.loadFollowedUsers(); }
//
//     loadFollowedUsers(): void {
//         this.userService.getFollowedUsers().pipe(
//             tap((users: Users[]) => {
//                 this.followedUsers = users;
//             }),
//             catchError(error => {
//                 console.error('Failed to load followed users:', error);
//                 return of([]);
//             })
//         ).subscribe();
//     }
//
//
//     userId(id: number) {
//         this.selectedUserId = id;
//         console.log("Selected user id is : ", this.selectedUserId);
//         this.router.navigate(['/chat', this.selectedUserId])
//             .catch(error => console.error('Navigation error:', error));
//     }
//
// }
export class MessagesComponent {
    followedUsers = [
        { id: 1, name: 'John Doe', avatarUrl: 'path/to/avatar1.jpg' },
        { id: 1, name: 'John Doe', avatarUrl: 'path/to/avatar1.jpg' },
        { id: 1, name: 'John Doe', avatarUrl: 'path/to/avatar1.jpg' },
        { id: 1, name: 'John Doe', avatarUrl: 'path/to/avatar1.jpg' },
        { id: 1, name: 'John Doe', avatarUrl: 'path/to/avatar1.jpg' },
        { id: 1, name: 'John Doe', avatarUrl: 'path/to/avatar1.jpg' },
        { id: 1, name: 'John Doe', avatarUrl: 'path/to/avatar1.jpg' },
        { id: 1, name: 'John Doe', avatarUrl: 'path/to/avatar1.jpg' },
        { id: 1, name: 'John Doe', avatarUrl: 'path/to/avatar1.jpg' },
        { id: 1, name: 'John Doe', avatarUrl: 'path/to/avatar1.jpg' },
        { id: 1, name: 'John Doe', avatarUrl: 'path/to/avatar1.jpg' },
        { id: 1, name: 'John Doe', avatarUrl: 'path/to/avatar1.jpg' },
        { id: 1, name: 'John Doe', avatarUrl: 'path/to/avatar1.jpg' },
        { id: 2, name: 'Jane Smith', avatarUrl: 'path/to/avatar2.jpg' }
        // Add more users as needed
    ];

    selectedUser: any = null;
    message: string = '';

    // Method to select a user
    selectUser(user: any) {
        this.selectedUser = user;
    }

    // Placeholder method to send a message
    sendMessage() {
        console.log('Message sent:', this.message);
    }

    // Placeholder method to open a video call
    openVideoCall() {
        console.log('Starting video call with:', this.selectedUser.name);
    }

    toggleEmojiPicker() {

    }

    onFocus() {

    }
}
