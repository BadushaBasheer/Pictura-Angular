import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Users} from "../interface/Users";


@Injectable({
    providedIn: 'root'
})
export class UserService {

    private apiUrl = "http://localhost:8080/users";

    constructor(private http: HttpClient) {}

    getAllUsers(): Observable<Users[]> {
        return this.http.get<Users[]>(`${this.apiUrl}/allUsers`);
    }

    getUser(): Observable<Users> {
        return this.http.get<Users>(`${this.apiUrl}/`);

    }

    getAuthenticatedUser(): Observable<Users> {
        return this.http.get<Users>(`${this.apiUrl}/userDetail`);
    }

    getUserById(userId: number): Observable<Users> {
        return this.http.get<Users>(`${this.apiUrl}/${userId}`);
    }

    searchUser(query: string): Observable<Users[]> {
        return this.http.get<Users[]>(`${this.apiUrl}/search`, { params: { query } });
    }

    updateUser(userId: number, updatedUser: Users): Observable<Users> {
        return this.http.put<Users>(`${this.apiUrl}/${userId}`, updatedUser);
    }

    followUser(userId1: number, userId2: number): Observable<Users> {
        return this.http.put<Users>(`${this.apiUrl}/follow/${userId1}/${userId2}`, null);
    }

    blockUser(blockedId: number): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/block/${blockedId}`, null);
    }

    unblockUser(blockedId: number): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/unblock/${blockedId}`, null);
    }
}
