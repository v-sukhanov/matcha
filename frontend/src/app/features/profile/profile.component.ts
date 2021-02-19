import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '@core/services/user.service';
import { DictionaryService } from '@core/services/dictionary.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from '@core/services/data.service';
import { ILocation } from '@core/interfaces/user.interface';

@Component({
	selector: 'matcha-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

	public lat: number;
	public lng: number;
	private _unsub$: Subject<void>;

	constructor(
		private _httpClient: HttpClient,
		public userService: UserService,
		public dictionaryService: DictionaryService,
		private _dataService: DataService
	) {
		this.lat = 0;
		this.lng = 0;
		this._unsub$ = new Subject<void>();
	}

	ngOnInit(): void {
		this.userService.user$
			.pipe(
				takeUntil(this._unsub$)
			)
			.subscribe(user => {
				this.lat = user.location.latitude;
				this.lng = user.location.longitude;
			});
	}

	public ngOnDestroy(): void {
		this._unsub$.next();
		this._unsub$.complete();
	}

	public editLocation(): void {
		this._dataService.setLocation(this.lng, this.lat).subscribe();
	}

	public setLocationByGPS(): void {
		this._httpClient.get<ILocation>('http://api.ipapi.com/94.159.91.198?access_key=e5ae430abf542f232a01939644cb1b3e')
			.subscribe((data: ILocation) => {
				this._dataService.setLocation(data.longitude, data.latitude).subscribe(() => {
					this.userService.getUser();
				});
			});
	}
}
