import { Injectable, NgZone } from '@angular/core';
import { interval, ReplaySubject } from 'rxjs';
import { skipWhile, switchMap, take } from 'rxjs/operators';
import { Params, Router, RoutesRecognized } from '@angular/router';
import { StorageKeyEnum } from '../enums/storage-key.enum';
import { DictionaryService } from './dictionary.service';
import { LocalstorageService } from './localstorage.service';
import { environment } from '@env';
import { NavigationService } from '@core/services/navigation.service';

@Injectable()
export class AuthenticationService {

	public authenticated$: ReplaySubject<void>;
	private set _refreshToken(value: string) {
		if (!value) {
			this._localStorageService.removeItem(StorageKeyEnum.RefreshToken);
		} else {
			this._localStorageService.setStorageValue(StorageKeyEnum.RefreshToken, value);
		}
	}
	private set _accessToken(value: string) {
		if (!value) {
			this._localStorageService.removeItem(StorageKeyEnum.AccessToken);
		} else {
			this._localStorageService.setStorageValue(StorageKeyEnum.AccessToken, value);
		}
	}
	public get accessToken(): string | null {
		return this._localStorageService.getStorageStringItem(StorageKeyEnum.AccessToken);
	}

	constructor(
		private _localStorageService: LocalstorageService,
		private _router: Router,
		private _dictionaryService: DictionaryService,
		private _zone: NgZone,
		private _navigationService: NavigationService
	) {
		this.authenticated$ = new ReplaySubject<void>(1);
		this.checkUrlForTokens();
	}

	public checkUrlForTokens(): void {
		this._router.events
			.pipe(
				skipWhile(val => {
					return !(val instanceof RoutesRecognized);
				}),
				take(1)
			)
			// @ts-ignore
			.subscribe((val: RoutesRecognized) => {
				this._checkTokens(
					val.state.root.queryParams.access_token,
					val.state.root.queryParams.refresh_token,
					val.url,
					val.state.root.queryParams
				);
			});
	}

	private _checkTokens(accessToken: string, refreshToken: string | null, url: string, params: Params): void {
		if (accessToken) {
			this._accessToken = accessToken;
			this._refreshToken = refreshToken ?? '';
			this.authenticated$.next();
			const newParams: Params = {};
			for (const param in params) {
				if (param !== 'access_token' && param !== 'refresh_token') {
					newParams[param] = params[param];
				}
			}
			this._navigationService.navigateByUrl(url.split('?')[0], newParams);
		} else {
			if (this._localStorageService.getStorageStringItem(StorageKeyEnum.AccessToken)) {
				this._accessToken = this._localStorageService.getStorageStringItem(StorageKeyEnum.AccessToken) ?? '';
				this.authenticated$.next();
			} else {
				this._navigationService.navigateToLogin();
			}
		}
	}

	public logout(): void {
		this._localStorageService.removeItem(StorageKeyEnum.AccessToken);
		this._localStorageService.removeItem(StorageKeyEnum.RefreshToken);
		window.location.href = environment.loginPage;
	}
}
