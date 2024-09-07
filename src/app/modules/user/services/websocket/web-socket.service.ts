// // import { Injectable } from '@angular/core';
// // import { Stomp } from '@stomp/stompjs';
// // import * as SockJS from 'sockjs-client';
// // import {BehaviorSubject, Observable} from 'rxjs';
// // import {Message} from "../interface/Message";
// //
// // @Injectable({
// //     providedIn: 'root'
// // })
// // export class ChatService {
// //
// //     private stompClient: any
// //     private messageSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
// //
// //     constructor() {
// //         this.initConnectionSocket();
// //     }
// //
// //     initConnectionSocket() {
// //         const url = 'http://localhost:8080/chat-socket';
// //         const socket = new SockJS(url);
// //         this.stompClient = Stomp.over(socket)
// //     }
// //
// //     sendMessage(request: any) : Observable<any> {
// //         return this.stompClient.send(`/app/create`, request);
// //     }
// //
// //     getMessageSubject(){
// //         return this.messageSubject.asObservable();
// //     }
// // }
//
// import { Injectable } from '@angular/core';
// import { Stomp } from '@stomp/stompjs';
// import * as SockJS from 'sockjs-client';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { Message } from '../interface/Message';
// import {SendMessageRequest} from "../request/SendMessageRequest";
//
// @Injectable({
//     providedIn: 'root'
// })
// export class ChatService {
//     private stompClient: any;
//     private messageSubject: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
//
//     constructor() {
//         this.initConnectionSocket();
//     }
//
//     private initConnectionSocket() {
//         const url = 'http://localhost:8080/chat-socket';
//         const socket = new SockJS(url);
//         this.stompClient = Stomp.over(socket);
//
//         this.stompClient.connect({}, (frame: string) => {
//             console.log('Connected: ' + frame);
//
//             this.stompClient.subscribe('/topic/messages', (message: { body: string; }) => {
//                 if (message.body) {
//                     const newMessages: Message[] = JSON.parse(message.body);
//                     this.messageSubject.next(newMessages);
//                 }
//             });
//         }, (error: any) => {
//             console.error('Error connecting to WebSocket', error);
//         });
//     }
//
//     joinRoom(roomId: string) {
//         this.stompClient.connect({}, ()=>{
//             this.stompClient.subscribe(`/topic/${roomId}`, (messages: any) => {
//                 const messageContent = JSON.parse(messages.body);
//                 const currentMessages = this.messageSubject.getValue();
//
//                 const updatedMessages=[...currentMessages,messageContent];
//                 this.messageSubject.next(updatedMessages);
//             })
//         })
//     }
//
//
//
//     sendMessage(roomId: string, request: any): Observable<Message> {
//         return new Observable<Message>((observer) => {
//             this.stompClient.send(`/app/create/${roomId}`, {}, JSON.stringify(request));
//             observer.next(request);
//             observer.complete();
//         });
//     }
//
//
//     // sendMessage(request: any): void {
//     //     this.stompClient.send('/app/create', {}, JSON.stringify(request));
//     // }
//
//     getMessageSubject(): Observable<Message[]> {
//         return this.messageSubject.asObservable();
//     }
// }
//

//Currently working
// import { Injectable } from '@angular/core';
// import { Stomp } from '@stomp/stompjs';
// import * as SockJS from 'sockjs-client';
// import { BehaviorSubject } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import {Message} from "../interface/Message";
//
// @Injectable({
//     providedIn: 'root'
// })
// export class ChatService {
//
//     private stompClient: any;
//     private messageSubject: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
//
//     constructor(private http: HttpClient) {
//         this.initConnectionSocket();
//     }
//
//     initConnectionSocket() {
//         const url = 'http://localhost:8080/message/ws';
//         const socket = new SockJS(`${url}`);
//         this.stompClient = Stomp.over(socket);
//         this.stompClient.reconnect_delay = 5000;
//
//         this.stompClient.connect({}, (frame: string) => {
//             console.log('Connected: ' + frame);
//             this.stompClient.subscribe('/topic/roomId', (message: { body: any; }) => {
//                 console.log(message.body);
//             });
//         }, (error: string) => {
//             console.error('Connection error: ' + error);
//         });
//     }
//
//     joinRoom(roomId: string) {
//         this.stompClient.connect({}, () => {
//             this.stompClient.subscribe(`/topic/${roomId}`, (message: any) => {
//                 const messageContent = JSON.parse(message.body);
//                 const currentMessages = this.messageSubject.getValue();
//                 currentMessages.push(messageContent);
//                 this.messageSubject.next(currentMessages);
//             });
//         });
//     }
//
//     sendMessage(roomId: string, request: any): void {
//
//         console.log("Request in frontend is:", request)
//         console.log("RoomId in frontend is:", roomId)
//         this.stompClient.send(`/message/create/${roomId}`, {}, JSON.stringify(request));
//     }
//
//     getMessageSubject() {
//         return this.messageSubject.asObservable();
//     }
//
// }


// import { Injectable } from '@angular/core';
// import {BehaviorSubject} from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import * as SockJS from 'sockjs-client';
// import * as Stomp from 'stompjs';
// import {Message} from "../interface/Message";
//
//
// @Injectable({
//     providedIn: 'root'
// })
// export class ChatService {
//
//     private stompClient: any;
//     private messageSubject: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
//
//     constructor(private http: HttpClient) {
//         this.initConnectionSocket();
//     }
//
//     initConnectionSocket() {
//         const url = 'http://localhost:8080/ws';  // Your WebSocket URL
//         const socket = new SockJS(url);
//         this.stompClient = Stomp.over(socket);
//         this.stompClient.reconnect_delay = 5000;
//
//         this.stompClient.connect({}, (frame: string) => {
//             console.log('Connected: ' + frame);
//         }, (error: string) => {
//             console.error('Connection error: ' + error);
//         });
//     }
//
//     joinRoom(roomId: string) {
//         this.stompClient.connect({}, () => {
//             this.stompClient.subscribe(`/topic/${roomId}`, (message: any) => {
//                 const messageContent = JSON.parse(message.body);
//                 const currentMessages = this.messageSubject.getValue();
//                 currentMessages.push(messageContent);
//                 this.messageSubject.next(currentMessages);
//             });
//         });
//     }
//
//     sendMessage(roomId: string, request: any): void {
//         console.log("Request in frontend is:", request);
//         console.log("RoomId in frontend is:", roomId);
//         this.stompClient.send(`/message/create/${roomId}`, {}, JSON.stringify(request));
//     }
//
//     getMessageSubject() {
//         return this.messageSubject.asObservable();
//     }
//
//     getChatUpdates(selectedUserId: number): Observable<any> {
//         console.log("Chat id is ", selectedUserId);
//         return new Observable(observer => {
//             this.stompClient.connect({}, () => {
//                 // this.stompClient.subscribe(`/topic/${chatId}`, (message: any) => {
//                 this.stompClient.subscribe(`/chat/getOrCreate/{selectedUserId}`, (message: any) => {
//                     observer.next(JSON.parse(message.body));
//                 });
//             }, (error: string) => {
//                 console.error('Subscription error: ' + error);
//             });
//         });
//     }
// }

// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import * as SockJS from 'sockjs-client';
// import { Client, IMessage, IFrame } from '@stomp/stompjs';
// import { Message } from '../interface/Message';
//
// @Injectable({
//     providedIn: 'root'
// })
// export class ChatService {
//
//     private stompClient!: Client;
//     private messageSubject: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
//
//     constructor() {
//         this.initConnectionSocket();
//     }
//
//     initConnectionSocket() {
//         const url = 'http://localhost:8080/ws';
//         const socket = new SockJS(url);
//
//         this.stompClient = new Client({
//             webSocketFactory: () => socket,
//             reconnectDelay: 5000,
//             debug: (str) => {
//                 console.log(str);
//             }
//         });
//
//         // Event when connected
//         this.stompClient.onConnect = (frame: IFrame) => {
//             console.log('Connected to server with session ID: ' + frame.headers['session'] || 'unknown');
//             console.log('Full headers: ', frame.headers);
//         };
//
//         // Event when an error occurs
//         this.stompClient.onStompError = (frame: IFrame) => {
//             console.error('Broker reported error: ' + frame.headers['message']);
//             console.error('Additional details: ' + frame.body);
//         };
//
//         // Activate the connection
//         this.stompClient.activate();
//     }
//
//     joinRoom(roomId: string) {
//         if (this.stompClient.connected) {
//             this.stompClient.subscribe(`/topic/${roomId}`, (message: IMessage) => {
//                 const messageContent = JSON.parse(message.body);
//                 const currentMessages = this.messageSubject.getValue();
//                 currentMessages.push(messageContent);
//                 this.messageSubject.next(currentMessages);
//             });
//         } else {
//             console.warn("Socket is not connected yet!");
//         }
//     }
//
//     sendMessage(roomId: string, request: any): void {
//         console.log("Request in frontend is:", request);
//         console.log("RoomId in frontend is:", roomId);
//         if (this.stompClient.connected) {
//             this.stompClient.publish({
//                 destination: `/message/create/${roomId}`,
//                 body: JSON.stringify(request)
//             });
//         } else {
//             console.error("Cannot send message, WebSocket not connected");
//         }
//     }
//
//     getMessageSubject() {
//         return this.messageSubject.asObservable();
//     }
// }

import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import * as SockJS from 'sockjs-client';
import { Client, IMessage, IFrame } from '@stomp/stompjs';
import { Message } from '../interface/Message';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {

    private stompClient!: Client;
    private messageSubject: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);

    constructor() {
        this.initConnectionSocket();
    }

    initConnectionSocket() {
        const url = 'http://localhost:8080/ws';
        const socket = new SockJS(url);

        this.stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            debug: (str) => {
                console.log(str);
            }
        });

        // Event when connected
        this.stompClient.onConnect = (frame: IFrame) => {
            console.log('Connected to server with session ID: ' + frame.headers['session'] || 'unknown');
            console.log('Full headers: ', frame.headers);
        };

        // Event when an error occurs
        this.stompClient.onStompError = (frame: IFrame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };

        // Activate the connection
        this.stompClient.activate();
    }



    sendMessage(request: any): void {
        console.log("Request in frontend is:", request);
        if (this.stompClient.connected) {
            this.stompClient.publish({
                destination: `/message/create`,
                body: JSON.stringify(request)
            });
        } else {
            console.error("Cannot send message, WebSocket not connected");
        }
    }

    // In MessageService
    getMessageObservable(): Observable<Message[]> {
        return this.messageSubject.asObservable();
    }

}
