import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BrowsingDataService } from '@features/browsing/services/browsing-data.service';
import { IUser } from '@core/interfaces/user.interface';
import { DictionaryService } from '@core/services/dictionary.service';
import { UserService } from '@core/services/user.service';

@Component({
	selector: 'matcha-browsing-profile',
	templateUrl: './browsing-profile.component.html',
	styleUrls: ['./browsing-profile.component.scss']
})
export class BrowsingProfileComponent implements OnInit, OnDestroy {
	public username: string;
	private _unsub$: Subject<void> = new Subject();
	public preference?: IUser;
	public canLike: boolean;

	constructor(
		private _activateRoute: ActivatedRoute,
		private _dataService: BrowsingDataService,
		public dictionaryService: DictionaryService,
		private _userService: UserService
	) {
		this.username = '';
		this.canLike = false;
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
		this._userService.user$
			.pipe(
				takeUntil(this._unsub$)
			)
			.subscribe(user => {
				if (!user?.avatarLink && !user?.photosLink?.length) {
					this.canLike = false;
				} else {
					this.canLike = true;
				}
			});
	}

	ngOnDestroy(): void {
		this._unsub$.next();
		this._unsub$.complete();
	}


	public like(id: string): void {
		if (!this.canLike) {
			return ;
		}
		this._dataService.like(id).subscribe((data) => {
			if (!this.preference?.fameRating && this.preference?.fameRating !== 0) {
				return ;
			}
			if (data?.like) {
				this.preference.fameRating++;
				this.preference.haveYourLike = true;
			} else {
				this.preference.fameRating--;
				this.preference.haveYourLike = false;
			}
		});
	}

	public block(id: string): void {
		this._dataService.block(id).subscribe();
	}

	public fake(id: string): void {
		this._dataService.fake(id).subscribe();
	}
}
