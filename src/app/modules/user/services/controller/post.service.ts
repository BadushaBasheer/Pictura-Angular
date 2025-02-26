import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {environment} from "../../../../environments/environment";
import {Posts} from "../interface/Posts";
import {ApiResponse} from "../interface";

@Injectable({
    providedIn: 'root'
})
export class PostService {

    private apiUrl = `${environment.apiBaseUrl}/posts`;

    constructor(private http: HttpClient) { }

    findAllPosts(): Observable<Posts[]> {
        return this.http.get<Posts[]>(`${this.apiUrl}`);
    }

    findUsersPost(userId: number): Observable<Posts[]> {
        return this.http.get<Posts[]>(`${this.apiUrl}/user/${userId}`);
    }

    findPostById(postId: number): Observable<Posts> {
        return this.http.get<Posts>(`${this.apiUrl}/${postId}`);
    }

    savePostById(postId: number, userId: number): Observable<Posts> {
        return this.http.put<Posts>(`${this.apiUrl}/save/${postId}/user/${userId}`, null);
    }

    likePostById(postId: number, userId: number): Observable<Posts> {
        return this.http.put<Posts>(`${this.apiUrl}/like/${postId}/user/${userId}`, null);
    }

    // createPost(postContent: any, file: File): Observable<Posts> {
    //     const formData: FormData = new FormData();
    //     formData.append('post', JSON.stringify({ content: postContent }));
    //     formData.append('file', file);
    //
    //     const headers = new HttpHeaders();
    //     headers.append('Content-Type', 'multipart/form-data');
    //
    //     return this.http.post<Posts>(`${this.apiUrl}/post`, formData, { headers });
    // }

    createPost(file: File, caption: string): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        formData.append('caption', caption);

        return this.http.post<any>(`${this.apiUrl}/post`, formData).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = 'An unknown error occurred!';
                if (error.error instanceof ErrorEvent) {
                    // Client-side error
                    errorMessage = `Error: ${error.error.message}`;
                } else {
                    // Server-side error
                    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                }
                console.error(errorMessage);
                return throwError(() => new Error(errorMessage));
            })
        );
    }

    // return this.http.post<Posts>(`${this.apiUrl}/post`, formData);


    // createPost(formData: FormData): Observable<any> {
    //     return this.http.post<any>(this.apiUrl, formData);
    // }

    deletePost(postId: number): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(`${this.apiUrl}/${postId}`);
    }
}
