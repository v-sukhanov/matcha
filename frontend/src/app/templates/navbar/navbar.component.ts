import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '@core/services/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'matcha-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
	private _unsub$: Subject<void>;
	public avatarLink: string;

	constructor(
		private _userService: UserService
	) {
		this._unsub$ = new Subject<void>();
		this.avatarLink = 'https://sun9-34.userapi.com/impf/c853620/v853620913/242309/mwseBew1S70.jpg?size=960x960&quality=96&proxy=1&sign=43d813c70d44d39600a80d72f2badb50&type=album';
	}

	ngOnInit(): void {
		this._userService.user$
			.pipe(
				takeUntil(this._unsub$)
			)
			.subscribe(user => {
				if (user.profilePictureLink) {
					this.avatarLink = user.profilePictureLink;
				}
			});
	}

	ngOnDestroy(): void {
		this._unsub$.next();
		this._unsub$.complete();
	}
}
