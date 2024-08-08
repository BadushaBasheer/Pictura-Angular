import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from './users';

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
    blockUserByAdmin(id: number): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/block-user/${id}`, {});
    }

    // Unblock a user by admin
    unblockUserByAdmin(id: number): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/unblock-user/${id}`, {});
    }
}
