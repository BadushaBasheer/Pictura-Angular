import { Injectable } from '@angular/core';

const TOKEN = 'token';
const USER = 'user';
const REFRESH_TOKEN = 'refreshToken';


@Injectable({
    providedIn: 'root'
})
export class StorageService {

    public static saveToken(token: string): void {
        localStorage.removeItem(TOKEN);
        localStorage.setItem(TOKEN, token);
    }

    public static saveRefreshToken(refreshToken: string): void {
        localStorage.removeItem(REFRESH_TOKEN);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
    }


    public static saveUser(user: any): void {
        localStorage.removeItem(USER);
        localStorage.setItem(USER, JSON.stringify(user));
    }

    public static getToken(): string {
        const token = localStorage.getItem(TOKEN);
        return token ? token : '';
    }

    public static getRefreshToken(): string {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        return refreshToken ? refreshToken : '';
    }

    public static getUser(): any {
        const user = localStorage.getItem(USER);
        try {
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error('Error parsing user data:', error);
            return null;
        }
    }



    public static getUserRole(): string {
        const user = this.getUser();
        return user ? user.role : '';
    }

    public static isAdminLoggedIn(): boolean {
        const token = this.getToken();
        const role = this.getUserRole();
        return token !== '' && role === 'ADMIN';
    }

    public static isUserLoggedIn(): boolean {
        const token = this.getToken();
        const role = this.getUserRole();
        // const refreshToken = this.getRefreshToken();
        return token !== '' && role === 'USER';
    }

    public static getUserId(): any {
        const user = this.getUser();
        return user ? user.id : '';
    }

    public static logout(): void {
        window.localStorage.removeItem(TOKEN);
        window.localStorage.removeItem(REFRESH_TOKEN);
        window.localStorage.removeItem(USER);
        window.localStorage.clear();
    }
}
