import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BrowsingDataService } from '@features/browsing/services/browsing-data.service';
import { IUser } from '@core/interfaces/user.interface';
import { DictionaryService } from '@core/services/dictionary.service';

@Component({
	selector: 'matcha-browsing-profile',
	templateUrl: './browsing-profile.component.html',
	styleUrls: ['./browsing-profile.component.scss']
})
export class BrowsingProfileComponent implements OnInit, OnDestroy {
	public username: string;
	private _unsub$: Subject<void> = new Subject();
	public preference?: IUser;


	constructor(
		private _activateRoute: ActivatedRoute,
		private _dataService: BrowsingDataService,
		public dictionaryService: DictionaryService
	) {
		this.username = '';
	}

	public ngOnInit(): void {
		this._activateRoute.params
			.pipe(
				takeUntil(this._unsub$)
			)
			.subscribe(params => {
				this._dataService.getPreferenceInfo(params['username']).subscribe((data) => {
					this.preference = data;
				});
			});
	}

	ngOnDestroy(): void {
		this._unsub$.next();
		this._unsub$.complete();
	}


}
