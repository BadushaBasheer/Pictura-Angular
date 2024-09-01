import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from './interfaces/users';
import {UserBlock} from "./interfaces/user-block";

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    private apiUrl = "http://localhost:8080/admin";

    constructor(private http: HttpClient) {}

    // Get all users
    getAllUsers(): Observable<Users[]> {
        return this.http.get<Users[]>(`${this.apiUrl}/getAllUsers`);
    }

    // Search for users by query
    searchUser(query: string): Observable<Users[]> {
        const params = new HttpParams().set('query', query);
        return this.http.get<Users[]>(`${this.apiUrl}/getUser`, { params });
    }

    // Update a user
    updateUser(user: Users): Observable<Users> {
        return this.http.put<Users>(`${this.apiUrl}/updateUser`, user);
    }

    // Delete a user by ID
    deleteUser(userId: number): Observable<string> {
        return this.http.delete<string>(`${this.apiUrl}/${userId}`);
    }

    // Block a user by admin
    // blockUserByAdmin(id: number): Observable<any> {
    //     return this.http.post<any>(`${this.apiUrl}/block-user/${id}`, {});
    // }
    // blockUserByAdmin(id: number): Observable<any> {
    //     return this.http.post<any>(`${this.apiUrl}/block/${id}`, {});
    // }

    // blockUser(blockedId: number): Observable<any> {
    //     return this.http.post<any>(`${this.apiUrl}/block/${blockedId}`, {});
    // }

    // Unblock a user by admin
    // unblockUserByAdmin(id: number): Observable<any> {
    //     return this.http.post<any>(`${this.apiUrl}/unblock-user/${id}`, {});
    // }

    // unblockUser(id: number): Observable<any> {
    //     return this.http.post<boolean>(`${this.apiUrl}/admin/unblock/${id}`, {});
    // }

    // unblockUser(id: number): Observable<{ success: boolean }> {
    //     return this.http.post<{ success: boolean }>(`${this.apiUrl}/unblock/${id}`, {});
    // }

    blockUserByAdmin(userId: number): Observable<Users> {
        const url = `${this.apiUrl}/block-user/${userId}`;
        return this.http.post<Users>(url, null);  // Send a POST request to block the user
    }

    unblockUserByAdmin(userId: number): Observable<Users> {
        const url = `${this.apiUrl}/unblock-user/${userId}`;
        return this.http.post<Users>(url, null);  // Send a POST request to unblock the user
    }


    getBlockedUsers(userId: number): Observable<UserBlock[]> {
        return this.http.get<UserBlock[]>(`${this.apiUrl}/${userId}/blocked`);
    }

    getUsersWhoBlocked(userId: number): Observable<UserBlock[]> {
        return this.http.get<UserBlock[]>(`${this.apiUrl}/${userId}/blocked-by`);
    }

    getAllUserBlocks(): Observable<UserBlock[]> {
        return this.http.get<UserBlock[]>(`${this.apiUrl}/all-blocks`);
    }
    getAllUserCount(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/getAllUsersCount`);
    }

    getAllPostsCount(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/getAllPostsCount`);
    }

    getAllBlockedAccountsCount(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/getAllBlockedAccountsCount`);
    }
}
