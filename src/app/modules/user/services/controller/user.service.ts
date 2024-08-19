import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {Users} from "../interface/Users";
import {StorageService} from "../../../../auth/components/services/storage/storage.service";


@Injectable({
    providedIn: 'root'
})
export class UserService {

    private apiUrl = "http://localhost:8080/users";

    constructor(private http: HttpClient) {}

    getAllUsers(): Observable<Users[]> {
        return this.http.get<Users[]>(`${this.apiUrl}/allUsers`);
    }

    getSuggestions(): Observable<Users[]> {
        return this.http.get<Users[]>(`${this.apiUrl}/suggestion`);
    }

    getUser(): Observable<Users> {
        return this.http.get<Users>(`${this.apiUrl}/`);

    }

    getMyDetails(): Observable<Users> {
        return this.http.get<Users>(`${this.apiUrl}/me`);
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

    updateUser(userData: FormData): Observable<Users> {
        return this.http.post<Users>(`${this.apiUrl}/update`, userData);
    }

    checkIfFollowed(userIdToCheck: number): Observable<boolean> {
        console.log("Came here...", userIdToCheck)
        return this.http.get<boolean>(`${this.apiUrl}/check-follow`, {
            params: { userIdToCheck }
        });
    }

    followUser(userId: number): Observable<any> {
        return this.http.put(`${this.apiUrl}/follow/${userId}`, {}).pipe(
            catchError(error => {
                console.error('Error following user', error);
                throw error;
            })
        );
    }
    unfollowUser(userId: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/unfollow/${userId}`).pipe(
            catchError(error => {
                console.error('Error unfollowing user', error);
                throw error;
            })
        );
    }

    getFollowedUsers(): Observable<Users[]> {
        return this.http.get<Users[]>(`${this.apiUrl}/followers`)
            .pipe(
                catchError(this.handleError<Users[]>('getFollowedUsers', []))
            );
    }

    getFollowingUsers(): Observable<Users[]> {
        return this.http.get<Users[]>(`${this.apiUrl}/following`)
            .pipe(
                catchError(this.handleError<Users[]>('getFollowingUsers', []))
            );
    }


    blockUser(blockedId: number): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/block/${blockedId}`, null);
    }

    unblockUser(blockedId: number): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/unblock/${blockedId}`, null);
    }



    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }
}
