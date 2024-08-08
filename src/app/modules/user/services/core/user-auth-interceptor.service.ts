import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StorageService} from "../../../../auth/components/services/storage/storage.service";

@Injectable()
export class UserInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = StorageService.getToken();
        // Clone the request to add the new header.
        if (token) {
            const authReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            return next.handle(authReq);
        }
        return next.handle(req);
    }
}
