import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '@core/services/user.service';
import { DictionaryService } from '@core/services/dictionary.service';

@Component({
	selector: 'matcha-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

	public lat: number;
	public lng: number;

	constructor(
		private _httpClient: HttpClient,
		public userService: UserService,
		public dictionaryService: DictionaryService
	) {
		this.lat = 0;
		this.lng = 0;
	}

	ngOnInit(): void {
		this.getLocation();
	}

	public getLocation(): void {
		this._httpClient.get('http://api.ipapi.com/94.159.91.198?access_key=e5ae430abf542f232a01939644cb1b3e')
			.subscribe((data: any) => {
				this.lat = data.latitude;
				this.lng = data.longitude;
			});
	}
}
