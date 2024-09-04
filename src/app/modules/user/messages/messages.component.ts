// import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
// import {Users} from "../services/interface/Users";
// import {UserService} from "../services/controller/user.service";
// import {map, tap} from "rxjs/operators";
// import {catchError, Observable, of} from "rxjs";
// import {MessageService} from "../services/controller/message.service";
// import {SendMessageRequest} from "../services/request/SendMessageRequest";
// import {Message} from "../services/interface/Message";
// import {StorageService} from "../../../auth/components/services/storage/storage.service";
// import {ChatService} from "../services/websocket/web-socket.service";
// import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
// import {VideoCallComponent} from "../video-call/video-call.component";
//
// @Component({
//     selector: 'messages',
//     templateUrl: './messages.component.html',
//     styles: [`
//         .scrollbar-hide::-webkit-scrollbar {
//             display: none;
//         }
//         .scrollbar-hide {
//             -ms-overflow-style: none;
//             scrollbar-width: none;
//         }
//     `]
// })
// export class MessagesComponent implements OnInit {
//     followedUsers: Users[] = [];
//     message = '';
//     chatMessages: Message[] = [];
//     selectedUser: any = null;
//     roomId!: string;
//
//     constructor(
//         private messageService: MessageService,
//         private userService: UserService,
//         private cdr: ChangeDetectorRef,
//         private chatService: ChatService,
//         private dialog: MatDialog,
//     ) {}
//
//     ngOnInit() {
//         this.loadFollowedUsers();
//     }
//
//     selectUser(user: any) {
//         this.selectedUser = user;
//         this.loadChatMessages();
//         this.cdr.detectChanges();
//     }
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
//     loadChatMessages() {
//         this.getChatIdForUser(this.selectedUser).subscribe(chatId => {
//             if (chatId !== undefined) {
//                 this.messageService.getChatMessages(chatId).subscribe(messages => {
//                     this.chatMessages = messages.sort((a, b) => b.id - a.id);
//                 });
//             } else {
//                 console.log('Chat ID is undefined');
//             }
//         });
//     }
//
//     getChatIdForUser(user: any): Observable<number | undefined> {
//         return this.messageService.getChatId(user.id).pipe(
//             map(chat => chat ? chat.valueOf() : undefined)
//         );
//     }
//
//
//
//     sendMessage(): void {
//         if (this.message.trim() === '') return;
//
//         this.messageService.getOrCreateChat(this.selectedUser.id).subscribe(chatId => {
//             const request: SendMessageRequest = {
//                 chatId: chatId,
//                 content: this.message
//             };
//             this.chatService.sendMessage(request).subscribe({
//                 next: (message) => {
//                     this.chatMessages.push(message);
//                     this.message = '';
//                 },
//                 error: (err) => {
//                     console.error('Failed to send message:', err);
//                 }
//             });
//         });
//     }
//
//
//     public getCurrentUserId(): number {
//         return StorageService.getUserId();
//     }
//
//     userId(id: number): void {
//         this.selectedUser = id;
//         // console.log("Selected user id is: ", this.selectedUser);
//     }
//
//     openVideoCall(selectedUser: Users) {
//         console.log("User id for video call", selectedUser.id);
//         const dialogConfig = new MatDialogConfig();
//         dialogConfig.data = {
//             selectedUser: selectedUser
//         };
//         dialogConfig.width = '650px';
//         dialogConfig.height = '700px';
//
//         this.dialog.open(VideoCallComponent, dialogConfig);
//     }
//
//
// }
// // sendMessage(): void {
// //     if (this.message.trim() === '') return;
// //     this.messageService.getOrCreateChat(this.selectedUser.id).subscribe(chatId => {
// //         const request: SendMessageRequest = {
// //             chatId: chatId,
// //             content: this.message
// //         };
// //         this.messageService.sendMessage(request).subscribe(message => {
// //             this.chatMessages.push(message);
// //             this.message = '';
// //         });
// //     });
// // }
//
// // public getCurrentUserId(): number {
//     // const userId = StorageService.getUserId()
//     // console.log("Current user id is :", userId)
//     // return userId;
// //     return StorageService.getUserId();
// // }


// import { Component, OnInit } from '@angular/core';
// import { ChangeDetectorRef } from '@angular/core';
// import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
// import { Observable, of } from 'rxjs';
// import { catchError, map, tap } from 'rxjs/operators';
// import { VideoCallComponent } from '../video-call/video-call.component';
// import {Users} from "../services/interface/Users";
// import {MessageService} from "../services/controller/message.service";
// import {UserService} from "../services/controller/user.service";
// import {ChatService} from "../services/websocket/web-socket.service";
// import {Message} from "../services/interface/Message";
// import {SendMessageRequest} from "../services/request/SendMessageRequest";
// import {StorageService} from "../../../auth/components/services/storage/storage.service";
//
// @Component({
//     selector: 'app-messages',
//     templateUrl: './messages.component.html',
//     styleUrls: ['./messages.component.scss']
// })
// export class MessagesComponent implements OnInit {
//     followedUsers: Users[] = [];
//     message = '';
//     chatMessages: Message[] = [];
//     selectedUser: any = null;
//     roomId!: string;
//
//     constructor(
//         private messageService: MessageService,
//         private userService: UserService,
//         private cdr: ChangeDetectorRef,
//         private chatService: ChatService,
//         private dialog: MatDialog,
//     ) {}
//
//     ngOnInit() {
//         this.loadFollowedUsers();
//     }
//
//     selectUser(user: any) {
//         this.selectedUser = user;
//         this.loadChatMessages();
//         this.cdr.detectChanges();
//     }
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
//     loadChatMessages() {
//         this.getChatIdForUser(this.selectedUser).subscribe(chatId => {
//             if (chatId !== undefined) {
//                 this.roomId = chatId.toString(); // Store the roomId
//                 this.chatService.joinRoom(this.roomId); // Join the room for real-time updates
//                 this.messageService.getChatMessages(chatId).subscribe(messages => {
//                     this.chatMessages = messages.sort((a, b) => b.id - a.id);
//                 });
//                 this.listenerMessage(); // Start listening for real-time messages
//             } else {
//                 console.log('Chat ID is undefined');
//             }
//         });
//     }
//
//     getChatIdForUser(user: any): Observable<number | undefined> {
//         return this.messageService.getChatId(user.id).pipe(
//             map(chat => chat ? chat.valueOf() : undefined)
//         );
//     }
//
//     sendMessage(): void {
//         if (this.message.trim() === '') return;
//
//         this.messageService.getOrCreateChat(this.selectedUser.id).subscribe(chatId => {
//             const request: SendMessageRequest = {
//                 chatId: chatId,
//                 content: this.message
//             };
//             this.chatService.sendMessage(request).subscribe({
//                 next: (message: Message) => {
//                     this.chatMessages.push(message);
//                     this.message = '';
//                 },
//                 error: (err: any) => {
//                     console.error('Failed to send message:', err);
//                 }
//             });
//         });
//     }
//
//     listenerMessage() {
//         this.chatService.getMessageSubject().subscribe((messages: Message[]) => {
//             messages.forEach((msg) => {
//                 // Prevent duplicate messages
//                 if (!this.chatMessages.find(m => m.id === msg.id)) {
//                     this.chatMessages.push(msg);
//                 }
//             });
//             this.cdr.detectChanges(); // Update the view
//         });
//     }
//
//     public getCurrentUserId(): number {
//         return StorageService.getUserId();
//     }
//
//     userId(id: number): void {
//         this.selectedUser = id;
//     }
//
//     openVideoCall(selectedUser: Users) {
//         console.log("User id for video call", selectedUser.id);
//         const dialogConfig = new MatDialogConfig();
//         dialogConfig.data = {
//             selectedUser: selectedUser
//         };
//         dialogConfig.width = '650px';
//         dialogConfig.height = '700px';
//
//         this.dialog.open(VideoCallComponent, dialogConfig);
//     }
// }

import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { VideoCallComponent } from '../video-call/video-call.component';
import {Users} from "../services/interface/Users";
import {MessageService} from "../services/controller/message.service";
import {UserService} from "../services/controller/user.service";
import {ChatService} from "../services/websocket/web-socket.service";
import {Message} from "../services/interface/Message";
import {SendMessageRequest} from "../services/request/SendMessageRequest";
import {StorageService} from "../../../auth/components/services/storage/storage.service";

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
})
export class MessagesComponent implements OnInit {
    followedUsers: Users[] = [];
    message = '';
    chatMessages: Message[] = [];
    selectedUser: any = null;
    roomId!: string;

    constructor(
        private messageService: MessageService,
        private userService: UserService,
        private cdr: ChangeDetectorRef,
        private chatService: ChatService,
        private dialog: MatDialog,
    ) {}

    ngOnInit() {
        this.loadFollowedUsers();
    }

    selectUser(user: any) {
        this.selectedUser = user;
        this.loadChatMessages();
        this.cdr.detectChanges();
    }

    loadFollowedUsers(): void {
        this.userService.getFollowedUsers().pipe(
            tap((users: Users[]) => {
                this.followedUsers = users;
            }),
            catchError(error => {
                console.error('Failed to load followed users:', error);
                return of([]);
            })
        ).subscribe();
    }

    loadChatMessages() {
        this.getChatIdForUser(this.selectedUser).subscribe(chatId => {
            if (chatId !== undefined) {
                this.roomId = chatId.toString(); // Store the roomId
                this.chatService.joinRoom(this.roomId); // Join the room for real-time updates
                this.messageService.getChatMessages(chatId).subscribe(messages => {
                    this.chatMessages = messages.sort((a, b) => b.id - a.id);
                });
                this.listenerMessage(); // Start listening for real-time messages
            } else {
                console.log('Chat ID is undefined');
            }
        });
    }

    getChatIdForUser(user: any): Observable<number | undefined> {
        return this.messageService.getChatId(user.id).pipe(
            map(chat => chat ? chat.valueOf() : undefined)
        );
    }

    sendMessage(): void {
        if (this.message.trim() === '') return;

        this.chatService.getChatUpdates(this.selectedUser.id).subscribe(chatId => {
            const request: SendMessageRequest = {
                chatId: chatId,
                content: this.message
            };
            // this.chatService.sendMessage(this.roomId, request).subscribe({
            //     next: (message: Message) => {
            //         this.chatMessages.push(message);
            //         this.message = '';
            //     },
            //     error: (err: any) => {
            //         console.error('Failed to send message:', err);
            //     }
            // });
            this.chatService.sendMessage(this.roomId, request);
            this.message = '';
        });
    }

    listenerMessage() {
        this.chatService.getMessageSubject().subscribe((messages: Message[]) => {
            messages.forEach((msg) => {
                // Prevent duplicate messages
                if (!this.chatMessages.find(m => m.id === msg.id)) {
                    this.chatMessages.push(msg);
                }
            });
            this.cdr.detectChanges(); // Update the view
        });
    }

    public getCurrentUserId(): number {
        return StorageService.getUserId();
    }

    userId(id: number): void {
        this.selectedUser = id;
    }

    openVideoCall(selectedUser: Users) {
        console.log("User id for video call", selectedUser.id);
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
            selectedUser: selectedUser
        };
        dialogConfig.width = '650px';
        dialogConfig.height = '700px';

        this.dialog.open(VideoCallComponent, dialogConfig);
    }
}
