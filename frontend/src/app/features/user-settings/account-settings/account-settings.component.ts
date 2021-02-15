import { Component, OnInit } from '@angular/core';
import { UserService } from '@core/services/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { UserSettingsDataService } from '@features/user-settings/services/user-settings-data.service';
import { take } from 'rxjs/operators';
import { animate, style, transition, trigger } from '@angular/animations';
import { timer } from 'rxjs';

@Component({
	selector: 'matcha-account-settings',
	templateUrl: './account-settings.component.html',
	styleUrls: ['./account-settings.component.scss'],
	animations: [
		trigger('anim', [
			transition('void => *', [
				style({
					height: '0px',
					opacity: '0',
					overflow: 'hidden'
				}),
				animate('150ms ease-out', style({
					height: '*',
					opacity: '*'
				}))
			]),
			transition('* => void', [
				style({
					height: '*',
					opacity: '*'
				}),
				animate('150ms ease-out', style({
					height: '0px',
					opacity: '0',
					overflow: 'hidden'
				}))
			]),
		])
	]
})
export class AccountSettingsComponent implements OnInit {
	public accountSettingsExpanded: boolean;
	public form: FormGroup;
	public profileChanged: boolean;

	constructor(
		public userService: UserService,
		private _dataService: UserSettingsDataService
	) {
		this.accountSettingsExpanded = true;
		this.profileChanged = false;
		this.form = new FormGroup({
			email: new FormControl(''),
			username: new FormControl(''),
			firstName: new FormControl(''),
			lastName: new FormControl('')
		});
		this.userService.user$
			.pipe(
				take(1)
			)
			.subscribe((user) => {
				this.form = new FormGroup({
					email: new FormControl(user.email),
					username: new FormControl(user.username),
					firstName: new FormControl(user.firstName),
					lastName: new FormControl(user.lastName)
				});
			});
	}


	ngOnInit(): void {
		console.log(1212);
	}

	public editAccountSettings(): void {
		const { email, username, firstName, lastName } = this.form.controls;
		this._dataService.editAccountSettings(email.value, username.value, firstName.value, lastName.value).subscribe((user) => {
			this.userService.getUser();
			this.profileChanged = true;
			timer(10000).subscribe(() => this.profileChanged = false);
		});
	}
}
