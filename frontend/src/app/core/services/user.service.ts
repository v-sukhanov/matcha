import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ILocation, IUser } from '@core/interfaces/user.interface';
import { DataService } from '@core/services/data.service';
import { AuthenticationService } from '@core/services/authentication.service';
import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
	public user$: ReplaySubject<IUser>;

	constructor(
		private _dataService: DataService,
		private _authService: AuthenticationService,
		private _httpClient: HttpClient
	) {
		this.user$ = new ReplaySubject<IUser>(1);
		this._authService.authenticated$
			.pipe(
				take(1)
			)
			.subscribe(() => {
				this.getUser();
			});
	}

	public getUser(): void {
		this._dataService.getUser().subscribe(user => {
			if (!user.location) {
				this._httpClient.get<ILocation>('http://api.ipapi.com/94.159.91.198?access_key=e5ae430abf542f232a01939644cb1b3e')
					.subscribe((data: ILocation) => {
						this._dataService.setLocation(data.longitude, data.latitude).subscribe(() => {
							this.user$.next({
								...user,
								location: data
							});
						});
					});
			} else {
				this.user$.next(user);
			}
		});
	}
}
