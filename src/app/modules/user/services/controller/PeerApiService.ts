import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PeerApiService {

    private apiUrl = 'http://localhost:8080/peers';

    constructor(private http: HttpClient) { }

    registerPeer(peerId: number): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, { peerId });
    }

    getPeerByUserId(): Observable<any> {
        return this.http.get(`${this.apiUrl}/me`);
    }
}
