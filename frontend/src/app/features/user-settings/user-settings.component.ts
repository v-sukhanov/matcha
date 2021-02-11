import { Component, OnInit } from '@angular/core';
import { UserService } from '@core/services/user.service';

@Component({
	selector: 'matcha-user-settings',
	templateUrl: './user-settings.component.html',
	styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
	public accountSettingsExpanded: boolean;

	constructor(
		public userService: UserService
	) {
		this.accountSettingsExpanded = false;
	}

	ngOnInit(): void {
	}

}
