import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Message} from "../interface/Message";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

    private baseUrl = `${environment.apiBaseUrl}/message`;

    constructor(private http: HttpClient) {}

    // sendMessage(request: any): Observable<Message> {
    //     return this.http.post<Message>(`${this.baseUrl}/create`, request);
    // }
    //
    // getOrCreateChat(selectedUserId: number): Observable<number> {
    //     return this.http.get<number>(`${this.baseUrl}/chat/getOrCreate/${selectedUserId}`);
    // }
    //
    //
    // getChatMessages(chatId: number): Observable<Message[]> {
    //     return this.http.get<Message[]>(`${this.baseUrl}/chat/${chatId}`);
    // }

    // deleteMessage(messageId: number): Observable<ApiResponse> {
    //     return this.http.delete<ApiResponse>(`${this.baseUrl}/${messageId}`);
    // }

    sendMessage(request: any): Observable<Message> {
        return this.http.post<Message>(`${this.baseUrl}/create`, request).pipe(
            catchError(error => {
                console.error('Error sending message:', error);
                return throwError(error);
            })
        );
    }

    getOrCreateChat(selectedUserId: number): Observable<number> {
        return this.http.get<number>(`${this.baseUrl}/chat/getOrCreate/${selectedUserId}`).pipe(
            catchError(error => {
                console.error('Error getting or creating chat:', error);
                return throwError(error);
            })
        );
    }

    getChatMessages(chatId: number): Observable<Message[]> {
        return this.http.get<Message[]>(`${this.baseUrl}/chat/${chatId}`).pipe(
            catchError(error => {
                console.error('Error fetching chat messages:', error);
                return throwError(error);
            })
        );
    }

    getChatId(selectedUserId: number): Observable<number> {
        return this.http.get<number>(
            `${this.baseUrl}/chat/getOrCreate/${selectedUserId}`
        );
    }
}
