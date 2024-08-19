import { Injectable } from '@angular/core';
import { StompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {

    private stompService: StompService;

    constructor() {
        this.stompService = new StompService({
            headers: undefined, heartbeat_in: 0, heartbeat_out: 0, reconnect_delay: 0, url: undefined,
            brokerURL: 'ws://localhost:8080/ws',
            connectHeaders: {},
            heartbeatIncoming: 0,
            heartbeatOutgoing: 20000,
            reconnectDelay: 5000,
            debug: true
        });
    }

    connect(): void {
        this.stompService.activate();
    }

    disconnect(): void {
        this.stompService.deactivate();
    }

    sendMessage(destination: string, body: any): void {
        this.stompService.publish({ destination, body: JSON.stringify(body) });
    }

    onMessage(topic: string): Observable<any> {
        return this.stompService.subscribe(topic).pipe(
            map((message: Message) => JSON.parse(message.body))
        );
    }
}
