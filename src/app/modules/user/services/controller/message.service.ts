import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message} from "../interface/Message";
import {SendMessageRequest} from "../request/SendMessageRequest";
import {ApiResponse} from "../interface";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

    private baseUrl = `${environment.apiBaseUrl}/message`;

    constructor(private http: HttpClient) {}

    sendMessage(request: SendMessageRequest): Observable<Message> {
        return this.http.post<Message>(`${this.baseUrl}/create`, request);
    }

    getOrCreateChat(selectedUserId: number): Observable<number> {
        return this.http.get<number>(`${this.baseUrl}/chat/getOrCreate/${selectedUserId}`);
    }


    getChatMessages(chatId: number): Observable<Message[]> {
        return this.http.get<Message[]>(`${this.baseUrl}/chat/${chatId}`);
    }

    deleteMessage(messageId: number): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(`${this.baseUrl}/${messageId}`);
    }

    getChatId(selectedUserId: number): Observable<number> {
        return this.http.get<number>(
            `${this.baseUrl}/chat/getOrCreate/${selectedUserId}`
        );
    }
}
