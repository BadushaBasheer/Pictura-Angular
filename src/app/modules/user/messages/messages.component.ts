import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Users} from "../services/interface/Users";
import {UserService} from "../services/controller/user.service";
import {map, tap} from "rxjs/operators";
import {catchError, Observable, of, Subscription} from "rxjs";
import {MessageService} from "../services/controller/message.service";
import {SendMessageRequest} from "../services/request/SendMessageRequest";
import {Message} from "../services/interface/Message";
import {StorageService} from "../../../auth/components/services/storage/storage.service";
import {SocketService} from "../services/websocket/socket.service";

@Component({
    selector: 'messages',
    templateUrl: './messages.component.html',
    styles: [`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    `]
})

// export class MessagesComponent implements OnInit {
//     followedUsers: Users[] = [];
//     selectedUser: any = null;
//     message = '';
//     chatMessages: Message[] = [];
//
//     constructor(private messageService: MessageService,
//                 private userService: UserService,
//                 private cdr: ChangeDetectorRef) { }
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
//     sendMessage(): void {
//         if (this.message.trim() === '') return;
//         this.messageService.getOrCreateChat(this.selectedUser.id).subscribe(chatId => {
//             const request: SendMessageRequest = {
//                 chatId: chatId,
//                 content: this.message
//             };
//             this.messageService.sendMessage(request).subscribe(message => {
//                 this.chatMessages.push(message);
//                 this.message = '';
//             });
//         });
//     }
//
//     public getCurrentUserId(): number {
//         const userId = StorageService.getUserId()
//         console.log("Current user id is :",userId)
//         return userId;
//     }
//
//     userId(id: number): void {
//         this.selectedUser = id;
//         console.log("Selected user id is: ", this.selectedUser);
//     }
//
//     openVideoCall() {
//
//     }
// }

// export class MessagesComponent implements OnInit {
//     followedUsers: Users[] = [];
//     selectedUser: any = null;
//     message = '';
//     chatMessages: Message[] = [];
//
//     constructor(
//         private messageService: MessageService,
//         private userService: UserService,
//         private socketService: WebSocketService,  // Inject WebSocket service
//         private cdr: ChangeDetectorRef
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
//     sendMessage(): void {
//         if (this.message.trim() === '') return;
//         this.messageService.getOrCreateChat(this.selectedUser.id).subscribe(chatId => {
//             const request: SendMessageRequest = {
//                 chatId: chatId,
//                 content: this.message
//             };
//             this.messageService.sendMessage(request).subscribe(message => {
//                 this.chatMessages.push(message);
//                 this.message = '';
//             });
//         });
//     }
//
//     public getCurrentUserId(): number {
//         const userId = StorageService.getUserId()
//         console.log("Current user id is :", userId)
//         return userId;
//     }
//
//     userId(id: number): void {
//         this.selectedUser = id;
//         console.log("Selected user id is: ", this.selectedUser);
//     }
//
//     openVideoCall() {
//         // Implement video call logic here
//     }
//
// }

// export class MessagesComponent implements OnInit {
//     followedUsers: Users[] = [];
//     selectedUser: any = null;
//     message = '';
//     chatMessages: Message[] = [];
//
//     constructor(
//         private messageService: MessageService,
//         private userService: UserService,
//         private socketService: SocketService,  // Inject WebSocket service
//         private cdr: ChangeDetectorRef
//     ) {}
//
//     ngOnInit() {
//         this.loadFollowedUsers();
//         this.setupSocketIOListeners(); // Set up WebSocket listeners
//     }
//
//     setupSocketIOListeners(): void {
//         this.socketService.getMessages().subscribe((message: Message) => {
//             if (this.selectedUser && message.chatId === this.selectedUser.id) {
//                 this.chatMessages.push(message);
//                 this.chatMessages.sort((a, b) => b.id - a.id); // Sort messages by ID (or other relevant criteria)
//             }
//         });
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
//     sendMessage(): void {
//         if (this.message.trim() === '') return;
//         this.messageService.getOrCreateChat(this.selectedUser.id).subscribe(chatId => {
//             const request: SendMessageRequest = {
//                 chatId: chatId,
//                 content: this.message
//             };
//             this.messageService.sendMessage(request).subscribe(message => {
//                 // Push message to chatMessages list
//                 this.chatMessages.push(message);
//                 this.message = '';
//                 // Send message via WebSocket
//                 this.socketService.sendMessage(message);
//             });
//         });
//     }
//
//     public getCurrentUserId(): number {
//         const userId = StorageService.getUserId();
//         console.log("Current user id is :", userId);
//         return userId;
//     }
//
//     userId(id: number): void {
//         this.selectedUser = id;
//         console.log("Selected user id is: ", this.selectedUser);
//     }
//
//     openVideoCall() {
//         // Implement video call logic here
//     }
// }
//


export class MessagesComponent implements OnInit {
    followedUsers: Users[] = [];
    selectedUser: any = null;
    message = '';
    chatMessages: Message[] = [];

    constructor(
        private messageService: MessageService,
        private userService: UserService,
        private socketService: SocketService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.loadFollowedUsers();
        this.setupSocketIOListeners(); // Set up WebSocket listeners
    }

    setupSocketIOListeners(): void {
        this.socketService.getMessages().subscribe({
            next: (message: Message) => {
                if (this.selectedUser && message.chatId === this.selectedUser.id) {
                    this.chatMessages.push(message);
                    this.chatMessages.sort((a, b) => b.id - a.id); // Sort messages by ID (or other relevant criteria)
                    this.cdr.detectChanges();
                }
            },
            error: (err) => console.error('WebSocket error:', err),
            complete: () => console.log('WebSocket connection closed.')
        });
    }

    selectUser(user: any): void {
        this.selectedUser = user;
        this.loadChatMessages();
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

    loadChatMessages(): void {
        this.getChatIdForUser(this.selectedUser).subscribe(chatId => {
            if (chatId !== undefined) {
                this.messageService.getChatMessages(chatId).subscribe(messages => {
                    this.chatMessages = messages.sort((a, b) => b.id - a.id);
                });
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

        this.messageService.getOrCreateChat(this.selectedUser.id).subscribe(chatId => {
            const request: SendMessageRequest = {
                chatId: chatId,
                content: this.message
            };

            this.messageService.sendMessage(request).subscribe(message => {
                // Push message to chatMessages list
                this.chatMessages.push(message);
                this.message = '';
                // Send message via WebSocket
                this.socketService.sendMessage(message);
            }, error => {
                console.error('Failed to send message:', error);
            });
        });
    }

    public getCurrentUserId(): number {
        const userId = StorageService.getUserId();
        console.log("Current user id is:", userId);
        return userId;
    }

    userId(id: number): void {
        this.selectedUser = id;
        console.log("Selected user id is:", this.selectedUser);
    }

    openVideoCall() {
        // Implement video call logic here
    }
}
