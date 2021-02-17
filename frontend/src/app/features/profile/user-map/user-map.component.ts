import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '@core/services/user.service';

@Component({
	selector: 'matcha-user-map',
	templateUrl: './user-map.component.html',
	styleUrls: ['./user-map.component.scss']
})
export class UserMapComponent implements OnInit {
	@Input() public lat: number;
	@Input() public lng: number;

	constructor(
		private _httpClient: HttpClient,
		public userService: UserService
	) {
		this.lat = 0;
		this.lng = 0;
	}

	ngOnInit(): void {
	}
}
