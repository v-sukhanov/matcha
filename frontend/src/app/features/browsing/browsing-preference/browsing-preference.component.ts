import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '@core/interfaces/user.interface';
import { GenderEnum } from '@core/enums/gender.enum';
import { BrowsingDataService } from '@features/browsing/services/browsing-data.service';
import { UserService } from '@core/services/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'matcha-browsing-preference',
	templateUrl: './browsing-preference.component.html',
	styleUrls: ['./browsing-preference.component.scss']
})
export class BrowsingPreferenceComponent implements OnInit, OnDestroy {
	@Input() public preference?: IUser;
	public genderEnum: typeof GenderEnum;
	private _unsub$: Subject<void>;
	public canLike: boolean;

	constructor(
		private _dataService: BrowsingDataService,
		private _userService: UserService
	) {
		this.genderEnum = GenderEnum;
		this._unsub$ = new Subject<void>();
		this.canLike = false;
	}

	ngOnInit(): void {
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

	public ngOnDestroy(): void {
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
}
