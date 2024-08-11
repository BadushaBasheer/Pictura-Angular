import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

    private commonSubject = new BehaviorSubject('');
    public commonMessage = this.commonSubject.asObservable();

    sendData(data: any){
        this.commonSubject.next(data);
    }
}
