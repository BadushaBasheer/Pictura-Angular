import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

    //Store it in the local storage
    private userEmail: string = 'userEmail';

    setEmail(email: string): void {
        localStorage.setItem(this.userEmail, email);
    }

    getEmail(): string | null {
        return localStorage.getItem(this.userEmail);
    }

}
