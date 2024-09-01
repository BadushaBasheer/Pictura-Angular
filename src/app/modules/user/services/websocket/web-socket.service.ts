// import {Injectable} from "@angular/core";
// import {WebSocketSubject} from "rxjs/internal/observable/dom/WebSocketSubject";
// import {catchError, Observable, of, retry, Subject} from "rxjs";
// import {webSocket} from "rxjs/webSocket";
// import {filter, map, tap} from "rxjs/operators";
//
// @Injectable({
//     providedIn: 'root'
// })
// export class WebSocketService {
//     private socket$!: WebSocketSubject<any>;
//     private messageSubject$ = new Subject<any>();
//     private readonly WS_URL = 'ws://localhost:8080/ws'; // WebSocket endpoint
//     private isConnected$ = new Subject<boolean>();
//
//     constructor() {}
//
//     connect() {
//         if (!this.socket$ || this.socket$.closed) {
//             this.socket$ = webSocket(this.WS_URL);
//
//             this.socket$.pipe(
//                 tap({
//                     next: () => this.isConnected$.next(true),
//                     error: err => {
//                         console.error('WebSocket error:', err);
//                         this.isConnected$.next(false);
//                     },
//                     complete: () => {
//                         console.log('WebSocket connection closed');
//                         this.isConnected$.next(false);
//                     }
//                 }),
//                 retry({
//                     count: 5,
//                     delay: 2000,
//                 })
//             ).subscribe({
//                 next: message => this.messageSubject$.next(message),
//                 error: err => console.error('WebSocket error after retries:', err),
//                 complete: () => console.log('WebSocket connection completely closed')
//             });
//         }
//     }
//
//
//     // Disconnect the WebSocket connection
//     disconnect() {
//         if (this.socket$) {
//             this.socket$.complete();
//             this.isConnected$.next(false);
//         }
//     }
//
//     // Check if the WebSocket is connected
//     isConnected(): Observable<boolean> {
//         return new Observable(observer => {
//             observer.next(this.socket$ && !this.socket$.closed);
//             observer.complete();
//         });
//     }
//
//     // Listen for messages
//     onMessage(): Observable<any> {
//         return this.messageSubject$.asObservable().pipe(
//             filter(message => !!message), // Only pass through messages that are not null or undefined
//             map(message => message), // You can add additional processing here
//             catchError(err => {
//                 console.error('Error occurred while receiving message:', err);
//                 return of(); // Return an empty observable in case of error
//             })
//         );
//     }
//
//     // Send a message via WebSocket
//     send(message: any) {
//         if (this.socket$ && !this.socket$.closed) {
//             this.socket$.next(message);
//         } else {
//             console.warn('Cannot send message. WebSocket is not connected. Reconnecting...');
//             this.connect();
//             setTimeout(() => {
//                 if (this.socket$ && !this.socket$.closed) {
//                     this.socket$.next(message);
//                 } else {
//                     console.error('Failed to reconnect and send message.');
//                 }
//             }, 1000);
//         }
//     }
//
// }


// import { Injectable } from '@angular/core';
// import { Client, IMessage, Stomp } from '@stomp/stompjs';
// import * as SockJS from 'sockjs-client';
// import { Observable, Subject } from 'rxjs';
//
// @Injectable({
//     providedIn: 'root'
// })
// export class WebSocketService {
//     private stompClient: Client | undefined;
//     private messageSubject$ = new Subject<any>();
//     private isConnected$ = new Subject<boolean>();
//     private readonly WS_URL = 'http://localhost:8080/ws'; // SockJS endpoint
//
//     constructor() {
//         this.connect();
//     }
//
//     connect(): void {
//         const socket = new SockJS(this.WS_URL);
//         this.stompClient = Stomp.over(socket);
//
//         this.stompClient.onConnect = () => {
//             console.log('Connected to WebSocket');
//             this.isConnected$.next(true);
//
//             // Subscribe to the topic where messages are sent
//             this.stompClient.subscribe('/topic/messages', (message: IMessage) => {
//                 this.messageSubject$.next(JSON.parse(message.body));
//             });
//         };
//
//         this.stompClient.onStompError = (error) => {
//             console.error('WebSocket error:', error);
//             this.isConnected$.next(false);
//         };
//
//         this.stompClient.activate();
//     }
//
//     disconnect(): void {
//         if (this.stompClient && this.stompClient.connected) {
//             this.stompClient.deactivate();
//             this.isConnected$.next(false);
//         }
//     }
//
//     isConnected(): Observable<boolean> {
//         return this.isConnected$.asObservable();
//     }
//
//     onMessage(): Observable<any> {
//         return this.messageSubject$.asObservable();
//     }
//
//     sendMessage(message: any): void {
//         if (this.stompClient && this.stompClient.connected) {
//             this.stompClient.publish({
//                 destination: '/app/sendMessage',
//                 body: JSON.stringify(message),
//             });
//         } else {
//             console.warn('Cannot send message. WebSocket is not connected. Reconnecting...');
//             this.connect();
//         }
//     }
// }


// web-web-socket.service.ts

// web-web-socket.service.ts
// import { Injectable } from '@angular/core';
// import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
// import { catchError, retryWhen, delay } from 'rxjs/operators';
// import { Observable, throwError } from 'rxjs';
//
// @Injectable({
//     providedIn: 'root'
// })
// export class WebSocketService {
//     private socket$!: WebSocketSubject<any>;
//
//     constructor() {
//         this.connect();
//     }
//
//     connect(): void {
//         this.socket$ = webSocket('ws://localhost:8080/ws');
//
//         this.socket$.subscribe({
//             next: (msg) => console.log('Message received:', msg),
//             error: (err) => console.error('WebSocket error:', err),
//             complete: () => console.warn('WebSocket connection closed')
//         });
//     }
//
//     sendMessage(message: any): void {
//         if (this.socket$) {
//             this.socket$.next(message);
//         } else {
//             console.error('WebSocket is not connected.');
//         }
//     }
//
//     onMessage(): Observable<any> {
//         return this.socket$.asObservable().pipe(
//             catchError(err => {
//                 console.error('Error caught in WebSocketService:', err);
//                 return throwError(() => new Error('WebSocket error occurred.'));
//             })
//         );
//     }
//
//     disconnect(): void {
//         if (this.socket$) {
//             this.socket$.complete();
//         }
//     }
// }


import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    private socket$: WebSocketSubject<any>;

    constructor() {
        this.socket$ = webSocket('ws://localhost:8080/ws');
    }



    sendMessage(message: any): Observable<any> {
        this.socket$.next(message);
        return new Observable(observer => {
            observer.complete();
        });
    }

    getMessage(): Observable<any> {
        return this.socket$.asObservable();
    }
}
