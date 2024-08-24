// import { Injectable } from '@angular/core';
// import { Client, Stomp } from '@stomp/stompjs';
// import * as SockJS from 'sockjs-client';
// import { Observable, Subject } from 'rxjs';
// import {Message} from "../interface/Message";
//
// @Injectable({
//     providedIn: 'root'
// })
// export class WebSocketService {
//
//     private client: SocketIOCli;
//     private messageSubject: Subject<Message> = new Subject<Message>();
//
//     constructor() {
//         this.client = new Client({
//             brokerURL: 'ws://localhost:8080/ws',  // Replace with your WebSocket endpoint
//             reconnectDelay: 5000,
//             heartbeatIncoming: 4000,
//             heartbeatOutgoing: 4000,
//             webSocketFactory: () => new SockJS('/ws'),  // Add this if using SockJS
//             debug: (str) => { console.log(str); }  // Enable this to see logs
//         });
//
//         this.client.onConnect = () => {
//             this.client.subscribe('/topic/messages', (message) => {
//                 this.messageSubject.next(JSON.parse(message.body));
//             });
//         };
//
//         this.client.onStompError = (frame) => {
//             console.error(`Broker reported error: ${frame.headers['message']}`);
//             console.error(`Additional details: ${frame.body}`);
//         };
//
//         this.client.activate();  // Use activate() instead of connect()
//     }
//
//     public getMessages(): Observable<Message> {
//         return this.messageSubject.asObservable();
//     }
//
//     public sendMessage(destination: string, body: any): void {
//         this.client.publish({ destination, body: JSON.stringify(body) });
//     }
// }


// import {Injectable} from "@angular/core";
// import {io} from "socket.io-client";
//
// @Injectable({
//     providedIn: 'root'
// })
// export class WebSocketService {
//
//     private socket: io("ws:");
//
// }


// import { Injectable } from '@angular/core';
// import { Stomp } from '@stomp/stompjs';
// import { Observable, Subject } from 'rxjs';
// import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
// import {HttpClient} from "@angular/common/http";
//
// @Injectable({
//     providedIn: 'root',
// })
// export class WebSocketService {
// private stompClient: any;
// private messageSubject: Subject<any> = new Subject<any>();
//
// // URL of the WebSocket endpoint
// private wsEndpoint: string = 'http://localhost:8080/ws';
//
// constructor() {
//     this.initializeWebSocketConnection();
// }
// private initializeWebSocketConnection(): void {
//     const socket = new SockJS(this.wsEndpoint);
//     this.stompClient = Stomp.over(socket);
//
//     const _this = this;
//     this.stompClient.connect({}, function (frame: any) {
//         console.log('Connected: ' + frame);
//
//         // Subscribe to the public topic for broadcasting
//         _this.stompClient.subscribe('/topic/public', (message: any) => {
//             _this.onMessageReceived(message);
//         });
//
//         // Subscribe to the private topic for specific user messages
//         _this.stompClient.subscribe('/user/queue/messages', (message: any) => {
//             _this.onMessageReceived(message);
//         });
//     });
// }
//
// /**
//  * Handle incoming messages from the server.
//  * @param message - Incoming message object
//  */
// private onMessageReceived(message: any): void {
//     console.log('Message received: ', message);
//     this.messageSubject.next(JSON.parse(message.body));
// }
//
// /**
//  * Send a message to the server.
//  * @param destination - The destination topic (e.g., '/app/private')
//  * @param message - The message object to be sent
//  */
// public sendMessage(destination: string, message: any): void {
//     this.stompClient.send(destination, {}, JSON.stringify(message));
// }
//
// /**
//  * Get an observable to listen to incoming messages.
//  * @returns Observable of messages
//  */
// public getMessages(): Observable<any> {
//     return this.messageSubject.asObservable();
// }
//
// /**
//  * Disconnect from the WebSocket server.
//  */
// public disconnect(): void {
//     if (this.stompClient !== null) {
//         this.stompClient.disconnect(() => {
//             console.log('Disconnected');
//         });
//     }
// }

//     private socket$: WebSocketSubject<any>;
//     private readonly backendUrl: string ='http://localhost:8080/ws';
//
//     constructor() {
//         this.socket$ = webSocket(this.backendUrl);
//     }
//
//     public getLiveData(): Observable<any> {
//         return this.socket$.asObservable();
//     }
// }

import {Injectable} from '@angular/core';
import {Observable, Observer, Subject} from 'rxjs';
import {Client, IMessage} from "@stomp/stompjs";

@Injectable({
    providedIn: 'root',
})
export class SocketService {
    // private socket!: WebSocket;
    // private subject!: Subject<string>;
    //
    // public connect(url: string): Observable<string> {
    //     this.socket = new WebSocket(url);
    //     this.subject = new Subject<string>();
    //
    //     this.socket.onmessage = (event) => this.subject.next(event.data);
    //     this.socket.onerror = (event) => this.subject.error(event);
    //     this.socket.onclose = () => this.subject.complete();
    //
    //     return this.subject.asObservable();
    // }
    //
    // public send(message: string): void {
    //     if (this.socket.readyState === WebSocket.OPEN) {
    //         this.socket.send(message);
    //     } else {
    //         console.error('WebSocket is not open. Message not sent.');
    //     }
    // }
    //
    // public close(): void {
    //     if (this.socket) {
    //         this.socket.close();
    //     }
    // }

    private stompClient!: Client;
    private messageSubject = new Subject<string>();

    constructor() {
        this.initializeWebSocketConnection();
    }

    initializeWebSocketConnection() {
        this.stompClient = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            debug: (str) => console.log(str),
            onConnect: (frame) => {
                console.log('Connected: ' + frame);
                this.stompClient.subscribe('/topic/public', (message: IMessage) => {
                    // this.messageSubject.next(JSON.parse(message.body));
                    this.messageSubject.next(message.body)
                });
            },
            onStompError: (frame) => {
                console.error('STOMP Error: ' + frame.headers['message']);
            },
            onWebSocketError: (event) => {
                console.error('WebSocket Error:', event);
            },
            onWebSocketClose: (event) => {
                console.warn('WebSocket closed, attempting to reconnect...', event);
            },
            onDisconnect: () => {
                console.log('Disconnected');
            }
        });
        this.stompClient.activate();
    }


    getMessages(): Observable<any> {
        return this.messageSubject.asObservable();
    }

    sendMessage(message: any): void {
        this.stompClient.publish({
            destination: '/app/send',
            body: JSON.stringify(message),
        });
    }

    close(): void {
        this.stompClient.deactivate();
    }
}

