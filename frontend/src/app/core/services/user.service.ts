import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { IUser } from '@core/interfaces/user.interface';
import { DataService } from '@core/services/data.service';
import { AuthenticationService } from '@core/services/authentication.service';
import { take } from 'rxjs/operators';

@Injectable()
export class UserService {
	public user$: ReplaySubject<IUser>;

	constructor(
		private _dataService: DataService,
		private _authService: AuthenticationService
	) {
		this.user$ = new ReplaySubject<IUser>(1);
		this._authService.authenticated$
			.pipe(
				take(1)
			)
			.subscribe(() => {
				this._getUser();
			});
	}

	private _getUser(): void {
		this._dataService.getUser().subscribe(user => {
			this.user$.next(user);
		});
	}
}
