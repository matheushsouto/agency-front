import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {UserService} from '../_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private refreshingInProgress: boolean;
    private accessTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(private userService: UserService, private httpClient: HttpClient) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((err) => {
                if (err.status === 401 && err.error.message === 'Unauthenticated.') {
                    return this.refreshToken(request, next);
                }
                return throwError(err);
            })
        );
    }

    private refreshToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.refreshingInProgress) {
            this.refreshingInProgress = true;
            this.accessTokenSubject.next(null);

            return this.httpClient.post<any>(`auth/refresh`, '').pipe(
                switchMap((res) => {
                    this.accessTokenSubject.next(res.token);
                    this.userService.setUser(res);
                    this.refreshingInProgress = false;
                    return next.handle(this.addAuthorizationHeader(request, res.token));
                })
            );
        } else {
            // wait while getting new token
            return this.accessTokenSubject.pipe(
                filter(token => token !== null),
                take(1),
                switchMap(token => {
                    // repeat failed request with new token
                    return next.handle(this.addAuthorizationHeader(request, token));
                }));
        }
    }

    private addAuthorizationHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
        if (token) {
            return request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
        }
        return request;
    }
}
