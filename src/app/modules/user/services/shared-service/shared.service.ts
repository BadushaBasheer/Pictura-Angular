import { Injectable } from '@angular/core';
import {Users} from "../interface/Users";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

    private selectedUserSubject = new BehaviorSubject<Users | null>(null);
    selectedUser = this.selectedUserSubject.asObservable();

    setSelectedUser(user: Users) {
        console.log('Setting selected user:', user);
        this.selectedUserSubject.next(user);
    }

    getSelectedUser(): Users | null {
        return this.selectedUserSubject.getValue();
    }
}
