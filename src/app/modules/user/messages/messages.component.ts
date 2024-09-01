import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Users} from "../services/interface/Users";
import {UserService} from "../services/controller/user.service";
import {map, tap} from "rxjs/operators";
import {catchError, Observable, of} from "rxjs";
import {MessageService} from "../services/controller/message.service";
import {SendMessageRequest} from "../services/request/SendMessageRequest";
import {Message} from "../services/interface/Message";
import {StorageService} from "../../../auth/components/services/storage/storage.service";
import {WebSocketService} from "../services/websocket/web-socket.service";

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
//         private webSocketService: WebSocketService,  // Inject WebSocket service
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
//         private webSocketService: SocketService,  // Inject WebSocket service
//         private cdr: ChangeDetectorRef
//     ) {}
//
//     ngOnInit() {
//         this.loadFollowedUsers();
//         this.setupSocketIOListeners(); // Set up WebSocket listeners
//     }
//
//     setupSocketIOListeners(): void {
//         this.webSocketService.getMessages().subscribe((message: Message) => {
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
//                 this.webSocketService.sendMessage(message);
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

// export class MessagesComponent implements OnInit {
//     followedUsers: Users[] = [];
//     selectedUser: any = null;
//     message = '';
//     chatMessages: Message[] = [];
//
//
//     constructor(
//         private messageService: MessageService,
//         private userService: UserService,
//         private webSocketService: SocketService,
//         private cdr: ChangeDetectorRef
//     ) {}
//
//     ngOnInit() {
//         this.loadFollowedUsers();
//         // this.setupSocketIOListeners(); // Set up WebSocket listeners
//     }
//
//     // setupSocketIOListeners(): void {
//     //     this.webSocketService.getMessages().subscribe({
//     //         next: (message: Message) => {
//     //             if (this.selectedUser && message.chatId === this.selectedUser.id) {
//     //                 this.chatMessages.push(message);
//     //                 this.chatMessages.sort((a, b) => b.id - a.id); // Sort messages by ID (or other relevant criteria)
//     //                 this.cdr.detectChanges();
//     //             }
//     //         },
//     //         error: (err) => console.error('WebSocket error:', err),
//     //         complete: () => console.log('WebSocket connection closed.')
//     //     });
//     // }
//
//     selectUser(user: any): void {
//         this.selectedUser = user;
//         this.loadChatMessages();
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
//     loadChatMessages(): void {
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
//
//         // this.messageService.getOrCreateChat(this.selectedUser.id).subscribe(chatId => {
//         //     const request: SendMessageRequest = {
//         //         chatId: chatId,
//         //         content: this.message
//         //     };
//
//
//
//             this.messageService.sendMessage(this.selectedUser).subscribe(message => {
//                 // Push message to chatMessages list
//                 this.chatMessages.push(message);
//                 this.message = '';
//                 // Send message via WebSocket
//                 // this.webSocketService.sendMessage(message);
//             }, error => {
//                 console.error('Failed to send message:', error);
//             });
//         // });
//     }
//
//     public getCurrentUserId(): number {
//         const userId = StorageService.getUserId();
//         console.log("Current user id is:", userId);
//         return userId;
//     }
//
//     userId(id: number): void {
//         this.selectedUser = id;
//         console.log("Selected user id is:", this.selectedUser);
//     }
//
//     openVideoCall() {
//         // Implement video call logic here
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
//         private webSocketService: WebSocketService,
//         private cdr: ChangeDetectorRef
//     ) {
//     }
//
//     ngOnInit() {
//         this.webSocketService.connect();
//         this.loadFollowedUsers();
//         this.setupSocketListeners();
//     }
//
//     setupSocketListeners(): void {
//         this.webSocketService.onMessage().subscribe({
//             next: (message: Message) => {
//                 console.log('Received message from WebSocket:', message); // Add logging
//                 if (this.selectedUser && message.user.id === this.selectedUser.id) {
//                     this.chatMessages.unshift(message);
//                     this.cdr.detectChanges();
//                 }
//             },
//             error: err => console.error('WebSocket error:', err),
//             complete: () => console.log('WebSocket connection closed.')
//         });
//
//         this.webSocketService.isConnected().subscribe(isConnected => {
//             console.log('WebSocket connection status:', isConnected);
//         });
//     }
//
//     // ngOnInit() {
//     //     this.webSocketService.connect();
//     //     this.loadFollowedUsers();
//     //     this.setupSocketListeners();
//     // }
//     //
//     // setupSocketListeners(): void {
//     //     this.webSocketService.onMessage().subscribe({
//     //         next: (message: any) => {
//     //             console.log('Received message:', message); // Debug log
//     //             if (this.selectedUser && message.user.id === this.selectedUser.id) {
//     //                 this.chatMessages.unshift(message);
//     //             }
//     //         },
//     //         error: err => console.error('Error receiving WebSocket message:', err)
//     //     });
//     // }
//     //
//
//     selectUser(user: Users): void {
//         this.selectedUser = user;
//         this.loadChatMessages();
//     }
//
//     loadFollowedUsers(): void {
//         this.userService.getFollowedUsers().pipe(
//             tap((users: Users[]) => this.followedUsers = users),
//             catchError(error => {
//                 console.error('Failed to load followed users:', error);
//                 return of([]);
//             })
//         ).subscribe();
//     }
//
//     loadChatMessages(): void {
//         this.getChatIdForUser(this.selectedUser!).subscribe(chatId => {
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
//     getChatIdForUser(user: Users): Observable<number | undefined> {
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
//             this.messageService.sendMessage(request).subscribe({
//                 next: (message: Message) => {
//                     this.chatMessages.unshift(message);
//                     this.message = '';
//                     this.webSocketService.isConnected().subscribe(isConnected => {
//                         if (isConnected) {
//                             this.webSocketService.send(message); // Send message via WebSocket
//                         } else {
//                             console.warn('Cannot send message. WebSocket is not connected.');
//                             this.webSocketService.connect();
//                         }
//                     });
//                 },
//                 error: err => {
//                     console.error('Failed to send message:', err);
//                 }
//             });
//         });
//     }
//
//     getCurrentUserId(): number {
//         // console.log("Current user id is:", userId);
//         return StorageService.getUserId();
//     }
//
//     userId(id: number): void {
//         this.selectedUser = id;
//         console.log("Selected user id is:", this.selectedUser);
//     }
//
//
//
//     openVideoCall() {
//         // Implement video call logic here
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
//         private webSocketService: WebSocketService, // Inject WebSocketService
//         private cdr: ChangeDetectorRef
//     ) {}
//
//     ngOnInit() {
//         this.loadFollowedUsers();
//
//         // Connect to WebSocket and subscribe to incoming messages
//         this.webSocketService.connect();
//         this.webSocketService.onMessage().subscribe((msg: Message) => {
//             if (msg && this.selectedUser && msg.chatId === this.selectedUser.chatId) {
//                 this.chatMessages.push(msg);
//                 this.cdr.detectChanges();
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
//             tap(chatId => {
//                 if (chatId) {
//                     user.chatId = chatId; // Store chat ID in selected user for real-time updates
//                 }
//             }),
//             catchError(() => of(undefined))
//         );
//     }
//
//     sendMessage(): void {
//         if (this.message.trim() === '') return;
//
//         // Send message using WebSocket
//         const newMessage: SendMessageRequest = {
//             chatId: this.selectedUser.chatId,
//             content: this.message
//         };
//
//         this.webSocketService.sendMessage(newMessage); // Send message through WebSocket
//         this.message = '';
//     }
//
//     public getCurrentUserId(): number {
//         const userId = StorageService.getUserId();
//         console.log("Current user id is:", userId);
//         return userId;
//     }
//
//     userId(id: number): void {
//         this.selectedUser = id;
//         console.log("Selected user id is:", this.selectedUser);
//     }
//
//     openVideoCall() {
//         // Implement video call functionality if needed
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
//         private webSocketService: WebSocketService, // WebSocket service
//         private cdr: ChangeDetectorRef
//     ) {}
//
//     ngOnInit() {
//         this.loadFollowedUsers();
//         this.initializeWebSocket();
//     }
//
//     initializeWebSocket(): void {
//         // Subscribe to WebSocket messages
//         this.webSocketService.getMessage().subscribe((message) => {
//             // Add the new message to the chat messages
//             if (this.selectedUser && message.chatId === this.selectedUser.chatId) {
//                 this.chatMessages.push(message);
//                 this.cdr.detectChanges();
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
//
//         // Create message object
//         const request: SendMessageRequest = {
//             chatId: this.selectedUser.chatId, // Ensure selectedUser has a chatId
//             content: this.message
//         };
//         this.webSocketService.sendMessage(request).subscribe(() => {
//             this.chatMessages.push({
//                 chatId: request.chatId,
//                 content: this.message,
//             });
//             this.message = '';
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
//         // Implement video call functionality here
//     }
// }

export class MessagesComponent implements OnInit {
    followedUsers: Users[] = [];
    selectedUser: any = null;
    message = '';
    chatMessages: Message[] = [];

    constructor(
        private messageService: MessageService,
        private userService: UserService,
        private webSocketService: WebSocketService, // WebSocket service
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.loadFollowedUsers();
        this.initializeWebSocket();
    }

    initializeWebSocket(): void {
        // Subscribe to WebSocket messages
        this.webSocketService.getMessage().subscribe((message: Message) => {
            if (this.selectedUser && message.chatId === this.selectedUser.chatId) {
                this.chatMessages.push(message);
                this.cdr.detectChanges();
            }
        });
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
                this.messageService.getChatMessages(chatId).subscribe(messages => {
                    this.chatMessages = messages.sort((a, b) => this.sortByTimeStamp(a, b));
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
        const request: SendMessageRequest = {
            chatId: this.selectedUser.chatId,
            content: this.message
        };

        this.webSocketService.sendMessage(request).subscribe((message: Message) => {
            // Add the new message to chat messages
            this.chatMessages.push(message);
            this.message = '';
        });
    }

    public getCurrentUserId(): number {
        // const userId = StorageService.getUserId();
        // console.log("Current user id is :", userId);
        // return userId;
        return StorageService.getUserId();

    }

    userId(id: number): void {
        this.selectedUser = id;
        console.log("Selected user id is: ", this.selectedUser);
    }

    openVideoCall() {
        // Implement video call functionality here
    }

    private sortByTimeStamp(a: Message, b: Message): number {
        const dateA = this.convertToDate(a.timeStamp);
        const dateB = this.convertToDate(b.timeStamp);
        return dateA.getTime() - dateB.getTime();
    }

    private convertToDate(timeStamp: string | Date): Date {
        return typeof timeStamp === 'string' ? new Date(timeStamp) : timeStamp;
    }
}

//
// export class MessagesComponent implements OnInit {
//     chatMessages: any[] = [];
//     message: string = '';
//     selectedUser: any;
//
//     constructor(private webSocketService: WebSocketService) { }
//
//     ngOnInit() {
//         this.initializeWebSocket();
//     }
//
//     initializeWebSocket() {
//         this.webSocketService.getMessage().subscribe({
//             next: (message) => {
//                 this.chatMessages.push(message);
//             },
//             error: (err) => {
//                 console.error('WebSocket error:', err);
//             }
//         });
//     }
//
//     sendMessage() {
//         if (this.message.trim() === '') return;
//         const request = {
//             chatId: this.selectedUser.chatId,
//             content: this.message
//         };
//
//         this.webSocketService.sendMessage(request);
//         this.message = '';
//     }
// }
//
