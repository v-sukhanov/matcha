import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '@core/services/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NavigationService } from '@core/services/navigation.service';
import { AuthenticationService } from '@core/services/authentication.service';
import { TemplateService } from '@core/services/template.service';

@Component({
	selector: 'matcha-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
	private _unsub$: Subject<void>;
	public avatarLink: string;
	public username: string;

	constructor(
		private _userService: UserService,
		public authService: AuthenticationService,
		public templateService: TemplateService
	) {
		this._unsub$ = new Subject<void>();
		this.avatarLink = 'assets/img/default_avatar.png';
		this.username = '';
	}

	ngOnInit(): void {
		this._userService.user$
			.pipe(
				takeUntil(this._unsub$)
			)
			.subscribe(user => {
				this.username = user.username;
				if (user.avatarLink) {
					this.avatarLink = user.avatarLink;
				} else {
					this.avatarLink = 'assets/img/default_avatar.png';
				}
			});
	}

	ngOnDestroy(): void {
		this._unsub$.next();
		this._unsub$.complete();
	}
}
