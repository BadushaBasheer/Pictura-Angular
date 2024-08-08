import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { StorageService } from '../storage/storage.service';
import {RefreshResponse} from "../response/RefreshResponse";
import {AuthResponse} from "../response/AuthResponse";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    register(registerRequest: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, registerRequest);
    }

    login(loginRequest: any): Observable<any> {
        console.log(loginRequest);
        return this.http.post(`${this.apiUrl}/login`, loginRequest).pipe(
            tap((response: any) => {
                if (response.token) {
                    StorageService.saveToken(response.token);
                    StorageService.saveUser(response.user);
                }
            }),
            catchError((error) => {
                console.log(error)
                return throwError(()=>new Error(error));
            })
        );
    }


    verifyAccount(token: string): Observable<any> {
        localStorage.removeItem('userEmail')
        const url = `${this.apiUrl}/activate-account?token=${token}`;
        return this.http.get(url);
    }

    resendOtp(email: string): Observable<any> {
        const url = `${this.apiUrl}/resend-otp?email=${email}`;
        return this.http.get(url);
    }

    googleLogin(data: any): Observable<any> {
        console.log(data, 'passing data...');
        return this.http.post(`${this.apiUrl}/google-login`, data).pipe(
            tap((response: any) => {
                if (response.token) {
                    StorageService.saveToken(response.token);
                    StorageService.saveUser(response.user);
                }
            })
        );
    }



    refreshToken(): Observable<AuthResponse> {
        const refreshToken = StorageService.getToken(); // Use StorageService
        const body: RefreshResponse = { refreshToken: refreshToken };

        return this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, body).pipe(
            tap((response: AuthResponse) => {
                console.log("Access token", response.accessToken);
                console.log("Refresh token", response.refreshToken);
                StorageService.saveToken(response.accessToken); // Use StorageService
                StorageService.saveToken(response.refreshToken); // Update this if needed
            })
        );
    }

    get loggedInUserId(): number {
        const userData = StorageService.getUserId();
        if (userData) {
            try {
                return JSON.parse(userData).uid;
            } catch (e) {
                console.error("Error parsing user data:", e);
                return 0;
            }
        }
        return 0;
    }


    logout(): void {
        StorageService.logout();
        this.http.get(`${this.apiUrl}/logout`).subscribe({
            next: () => {
                console.log('Logged out successfully on the server side');
            },
            error: (error) => {
                console.error('Failed to log out on the server side', error);
            }
        });
    }

}
