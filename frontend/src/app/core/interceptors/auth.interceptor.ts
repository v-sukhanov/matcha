import { Injectable } from '@angular/core';
import {
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpErrorResponse,
	HttpEvent,
	HttpClient
} from '@angular/common/http';
import { DataService } from '../services/data.service';
import { EMPTY, Observable, Subscriber } from 'rxjs';
import { NavigationService } from '../services/navigation.service';
import { environment } from '@env';
import { StorageKeyEnum } from '@core/enums/storage-key.enum';
import { catchError } from 'rxjs/operators';
import { LocalstorageService } from '@core/services/localstorage.service';

type CallerRequest = {
	subscriber: Subscriber<any>;
	failedRequest: HttpRequest<any>;
};

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	private _requestsRefresh: boolean;
	private _requests: CallerRequest[];

	constructor(
		private _dataService: DataService,
		private _http: HttpClient,
		private _storageService: LocalstorageService,
		private _navigationService: NavigationService,
	) {
		this._requests = [];
		this._requestsRefresh = false;
	}

	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		return new Observable<HttpEvent<any>>((subscriber) => {
			next.handle(req)
				.pipe(
					catchError((error) => {
						if (error.status === 401) {
							this._handleUnauthorizedError(subscriber, req);
						} else {
							subscriber.error(error);
						}
						subscriber.complete();
						return EMPTY;
					})
				)
				.subscribe((response) => {
					subscriber.next(response);
				});
		});
	}

	private _redirectToLogin(): void {
		this._storageService.removeItem(StorageKeyEnum.AccessToken);
		this._storageService.removeItem(StorageKeyEnum.RefreshToken);

		this._navigationService.navigateToLogin();
	}

	private _handleUnauthorizedError(subscriber: Subscriber<any>, request: HttpRequest<any>): void {
		this._requests.push({ subscriber, failedRequest: request });
		if (!this._requestsRefresh) {
			this._requestsRefresh = true;
			const refreshToken = this._storageService.getStorageStringItem(StorageKeyEnum.RefreshToken);
			const accessToken = this._storageService.getStorageStringItem(StorageKeyEnum.AccessToken);
			if (!refreshToken || !accessToken) {
				this._redirectToLogin();
				return;
			}
			this._dataService.tryRefreshToken(refreshToken, accessToken)
				.pipe(
					catchError(() => {
						console.log('errors');
						this._redirectToLogin();
						return EMPTY;
					})
				)
				.subscribe(tokens => {
					if (!tokens || !tokens.accessToken) {
						this._redirectToLogin();
						return;
					}
					this._storageService.setStorageValue(StorageKeyEnum.AccessToken, tokens.accessToken);
					this._storageService.setStorageValue(StorageKeyEnum.RefreshToken, tokens.refreshToken);
					this.repeatFailedRequests(tokens.accessToken);
					this._requestsRefresh = false;
				});
		}
	}

	private repeatFailedRequests(accessToken: string): void {
		this._requests.forEach((c) => {
			const requestWithNewToken = c.failedRequest.clone({
				headers: c.failedRequest.headers.set('Authorization', 'Bearer ' + accessToken)
			});
			this.repeatRequest(requestWithNewToken, c.subscriber);
		});
		this._requests = [];
	}

	private repeatRequest(requestWithNewToken: HttpRequest<any>, subscriber: Subscriber<any>): void {
		this._http.request(requestWithNewToken)
			.pipe(
				catchError((error: HttpErrorResponse) => {
					if (error.status === 401) {
						this._redirectToLogin();
					}
					subscriber.error(error);
					return EMPTY;
				})
			)
			.subscribe((res) => {
				subscriber.next(res);
				subscriber.complete();
			});
	}
}
