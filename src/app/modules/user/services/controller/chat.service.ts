import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse} from "../interface";
import {SingleChatRequest} from "../request/SingleChatRequest";
import {Chat} from "../interface/Chat";
import {GroupChatRequest} from "../request/GroupChatRequest";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
    private baseUrl = `${environment.apiBaseUrl}/chat`;

    constructor(private http: HttpClient) {}

    createSingleChat(request: SingleChatRequest): Observable<Chat> {
        return this.http.post<Chat>(`${this.baseUrl}/single`, request);
    }

    createGroupChat(request: GroupChatRequest): Observable<Chat> {
        return this.http.post<Chat>(`${this.baseUrl}/group`, request);
    }

    getChatById(chatId: number): Observable<Chat> {
        return this.http.get<Chat>(`${this.baseUrl}/${chatId}`);
    }

    getAllChatsByUser(): Observable<Chat[]> {
        return this.http.post<Chat[]>(`${this.baseUrl}/user`, {});
    }


    deleteChat(chatId: number): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(`${this.baseUrl}/delete/${chatId}`);
    }
}
