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
		this.avatarLink = 'assets/img/default_avatar.png';
	}

	ngOnInit(): void {
		this._userService.user$
			.pipe(
				takeUntil(this._unsub$)
			)
			.subscribe(user => {
				if (user.avatarLink) {
					this.avatarLink = user.avatarLink;
				}
			});
	}

	ngOnDestroy(): void {
		this._unsub$.next();
		this._unsub$.complete();
	}
}
