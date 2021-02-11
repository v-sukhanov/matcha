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
import { catchError, switchMap } from 'rxjs/operators';
import { LocalstorageService } from '@core/services/localstorage.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(
		private _dataService: DataService,
		private _http: HttpClient,
		private _storageService: LocalstorageService,
		private _navigationService: NavigationService,
	) {
	}

	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		return new Observable<HttpEvent<any>>((subscriber) => {
			next.handle(req)
				.pipe(
					catchError((error) => {
						if (error.status === 401) {
							return this._handleUnauthorizedError(subscriber, req);
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

	private _handleUnauthorizedError(subscriber: Subscriber<any>, request: HttpRequest<any>): Observable<any> {
		const refreshToken = this._storageService.getStorageStringItem(StorageKeyEnum.RefreshToken);
		const accessToken = this._storageService.getStorageStringItem(StorageKeyEnum.AccessToken);
		if (!refreshToken || !accessToken) {
			this._redirectToLogin();
			return EMPTY;
		}
		return this._dataService.tryRefreshToken(refreshToken, accessToken)
			.pipe(
				catchError(() => {
					this._redirectToLogin();
					return EMPTY;
				}),
				switchMap((tokens) => {
					if (!tokens || !tokens.accessToken) {
						this._redirectToLogin();
						return EMPTY;
					}
					this._storageService.setStorageValue(StorageKeyEnum.AccessToken, tokens.accessToken);
					this._storageService.setStorageValue(StorageKeyEnum.RefreshToken, tokens.refreshToken);
					const requestWithNewToken = request.clone({
						headers: request.headers.set('Authorization', 'Bearer ' + accessToken)
					});
					return this.repeatRequest(requestWithNewToken);
				})
			);
	}

	private repeatRequest(requestWithNewToken: HttpRequest<any>): Observable<any> {
		return this._http.request(requestWithNewToken)
			.pipe(
				catchError((error: HttpErrorResponse) => {
					if (error.status === 401) {
						this._redirectToLogin();
					}
					return EMPTY;
				})
			);
	}
}
