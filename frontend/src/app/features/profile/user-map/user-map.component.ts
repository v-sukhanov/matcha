import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'matcha-user-map',
	templateUrl: './user-map.component.html',
	styleUrls: ['./user-map.component.scss']
})
export class UserMapComponent implements OnInit {
	public lat: number;
	public lng: number;

	constructor(private _httpClient: HttpClient) {
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
