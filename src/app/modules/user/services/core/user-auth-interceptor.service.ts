import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {StorageService} from "../../../../auth/components/services/storage/storage.service";
import {AuthService} from "../../../../auth/components/services/auth/auth.service";

@Injectable()
export class UserInterceptor implements HttpInterceptor {

    // constructor() {
    // }
    //
    // intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //     const token = StorageService.getToken();
    //     // Clone the request to add the new header.
    //     if (token) {
    //         const authReq = req.clone({
    //             setHeaders: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         return next.handle(authReq);
    //     }
    //     return next.handle(req);
    // }

    private isRefreshing = false;

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = StorageService.getToken();

        let authReq = req;
        if (token) {
            authReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401 && !this.isRefreshing) {
                    this.isRefreshing = true;
                    return this.authService.refreshToken().pipe(
                        switchMap((newTokens) => {
                            this.isRefreshing = false;
                            const newAuthReq = req.clone({
                                setHeaders: {
                                    Authorization: `Bearer ${newTokens.accessToken}`
                                }
                            });
                            return next.handle(newAuthReq);
                        }),
                        catchError((refreshError) => {
                            this.isRefreshing = false;
                            this.authService.logout(); // Optional: Log out if the refresh token fails
                            return throwError(() => new Error(refreshError));
                        })
                    );
                }
                return throwError(() => new Error(error.message));
            })
        );
    }
}
