import { Component, OnInit } from '@angular/core';
import { UserService } from '@core/services/user.service';

@Component({
	selector: 'matcha-account-settings',
	templateUrl: './account-settings.component.html',
	styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
	public accountSettingsExpanded: boolean;

	constructor(
		public userService: UserService
	) {
		this.accountSettingsExpanded = false;
	}


	ngOnInit(): void {
		console.log(1212);
	}

}
