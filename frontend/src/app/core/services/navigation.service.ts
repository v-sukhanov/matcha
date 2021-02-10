import { Injectable, NgZone } from '@angular/core';
import { DictionaryService } from './dictionary.service';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { environment } from '@env';
import { PageEnum } from '@core/enums/page.enum';

@Injectable()
export class NavigationService {
	public previousUrl: string;
	public currentUrl: string;
	public currentUrl$: ReplaySubject<string>;
	public currentParams$: ReplaySubject<Params>;
	public currentParams: Params | null;

	constructor(
		private _dictionaryService: DictionaryService,
		private _router: Router,
		private _zone: NgZone,
		private _route: ActivatedRoute
	) {
		this.currentUrl$ = new ReplaySubject<string>(1);
		this.currentParams$ = new ReplaySubject<Params>();
		this.previousUrl = '';
		this.currentUrl = '';
		this.currentParams = null;
		this._zone.runOutsideAngular(() => {
			this._subscribeOnRouterEvent();
			this._subscribeOnCurrentParams();
		});
	}

	private _subscribeOnRouterEvent(): void {
		this._router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.previousUrl = this.currentUrl;
				this.currentUrl = window.location.href.split('#')[1];
				this.currentUrl$.next(this.currentUrl);
			}
		});
	}

	private _subscribeOnCurrentParams(): void {
		this._route.queryParams.subscribe(params => {
			this.currentParams = params;
			this.currentParams$.next(params);
		});
	}

	public navigateToLogin(): void {
		window.location.href = environment.loginPage;
	}

	public navigateByKey(pageType: PageEnum): void {
		if (!pageType) {
			return;
		}
		const value = this._dictionaryService.navigationPage.getValue(pageType);
		if (value) {
			this._router.navigate([`/${value}`]);
		}
	}

	public navigateByUrl(url: string, params?: Params): void {
		if (!url) {
			return;
		}
		this._router.navigate([url], { queryParams: params });
	}

	public addedParams(params: Params): void {
		if (params) {
			// console.log(this.currentUrl, params);
			this._router.navigate([this.currentUrl], { queryParams: params });
		}
	}

	public removeParams(): void {
		this._router.navigate([this.currentUrl]);
	}
}
