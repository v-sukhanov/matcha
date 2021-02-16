import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@core/services/authentication.service';
import { UserService } from '@core/services/user.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	constructor(
		private _authService: AuthenticationService,
		private _userService: UserService
	) {
	}

	public ngOnInit(): void {
	}
}

