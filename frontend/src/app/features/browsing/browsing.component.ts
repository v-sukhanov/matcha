import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BrowsingDataService } from '@features/browsing/services/browsing-data.service';
import { IUser } from '@core/interfaces/user.interface';
import { MatRadioChange } from '@angular/material/radio';
import { UserService } from '@core/services/user.service';
import { interval, Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IBrowsingFilter } from '@features/browsing/interfaces/browsing-filter.interface';

@Component({
	selector: 'matcha-browsing',
	templateUrl: './browsing.component.html',
	styleUrls: ['./browsing.component.scss']
})
export class BrowsingComponent implements OnInit, OnDestroy {
	public preferences: IUser[];
	public sortedPreferences: IUser[];
	public browsingFilter: IBrowsingFilter;
	private _currentUser?: IUser;
	private _unsub$: Subject<void>;
	public lat: number;
	public long: number;

	constructor(
		private _dataService: BrowsingDataService,
		public userService: UserService
	) {
		this._unsub$ = new Subject<void>();
		this.preferences = [];
		this.sortedPreferences = [];
		this.lat = 0;
		this.long = 0;
		this.browsingFilter = {
			distance: {
				min: 0,
				max: 20000,
				selectedMin: 0,
				selectedMax: 20000,
			},
			age: {
				min: 18,
				max: 100,
				selectedMin: 18,
				selectedMax: 100
			},
			fameRating: {
				min: 0,
				max: 100000,
				selectedMin: 0,
				selectedMax: 100000
			},
			tags: []
		};
	}

	ngOnInit(): void {
		this._dataService.getPreferences().subscribe(val => {
			this.preferences = val;
			this.sortedPreferences = val;
		});
		this.userService.user$
			.pipe(
				takeUntil(this._unsub$)
			)
			.subscribe(user => {
				this._currentUser = user;
				this.lat = user.location.latitude;
				this.long = user.location.longitude;
			});
	}

	public ngOnDestroy(): void {
		this._unsub$.next();
		this._unsub$.complete();
	}

	public applySort(browsingSort: MatRadioChange): void {
		if (browsingSort.value !== 'commonTags' && browsingSort.value !== 'distanceFromYou') {
			this.sortedPreferences = this.preferences.sort((a: any, b: any) => a[browsingSort.value] > b[browsingSort.value] ? -1 : 1);
		} else if (browsingSort.value === 'distanceFromYou') {
			this.sortedPreferences = this.preferences.sort((a: any, b: any) => a[browsingSort.value] > b[browsingSort.value] ? 1 : -1);
		} else if (browsingSort.value === 'commonTags') {
			this.sortedPreferences = this.preferences.sort((a: IUser, b: IUser) => {
				let numA: number | undefined = a.tags?.reduce(((accumulator, currentValue) => {
					let num = 0;
					if (this._currentUser?.tags?.find(val => val.text === currentValue.text)) {
						num = 1;
					}
					return accumulator + num;
				}), 0);
				let numB: number | undefined = b.tags?.reduce(((accumulator, currentValue) => {
					let num = 0;
					if (this._currentUser?.tags?.find(val => val.text === currentValue.text)) {
						num = 1;
					}
					return accumulator + num;
				}), 0);
				numA = numA ?? 0;
				numB = numB ?? 0;
				return numA > numB ? -1 : 1;
			});
		}
	}

	public applyFilter(): void {
		console.log(this.browsingFilter);
	}

	public filterFunc(val: IUser): boolean {
		if (val.distanceFromYou < this.browsingFilter.distance.selectedMin  || val.distanceFromYou > this.browsingFilter.distance.selectedMax) {
			return false;
		}
		if (val.age && (val.age < this.browsingFilter.age.selectedMin  || val.age > this.browsingFilter.age.selectedMax)) {
			return false;
		}

		if (val.fameRating < this.browsingFilter.fameRating.selectedMin  || val.fameRating > this.browsingFilter.fameRating.selectedMax) {
			return false;
		}
		if (this.browsingFilter.tags.length) {
			for (const tag of this.browsingFilter.tags) {
				if (!val.tags?.find(userTag => userTag.text === tag.text)) {
					return false;
				}
			}
		}
		return true;
	}

}
