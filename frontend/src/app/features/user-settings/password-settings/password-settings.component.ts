import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { UserSettingsDataService } from '@features/user-settings/services/user-settings-data.service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { NavigationService } from '@core/services/navigation.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'matcha-password-settings',
	templateUrl: './password-settings.component.html',
	styleUrls: ['./password-settings.component.scss'],
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
		])
	]
})
export class PasswordSettingsComponent implements OnInit {
	public expanded: boolean;
	public form: FormGroup;
	public errors: string[];

	constructor(
		private _dataService: UserSettingsDataService,
		private _navigationService: NavigationService
	) {
		this.expanded = false;
		this.form = new FormGroup({
			oldPassword: new FormControl(''),
			newPassword: new FormControl(''),
			repeatNewPassword: new FormControl(''),
		});
		this.errors = [];
	}

	ngOnInit(): void {
	}

	public editPassword(): void {
		this.errors = [];
		const { oldPassword, newPassword, repeatNewPassword } = this.form.controls;
		if (!oldPassword.value.trim()) {
			this.errors.push('old password should be field');
			return ;
		}
		if (newPassword.value !== repeatNewPassword.value) {
			this.errors.push('new password is not equal repeated new password');
			return ;
		}
		this._dataService.editPassword(oldPassword.value, newPassword.value, repeatNewPassword.value)
			.pipe(
				catchError(error => {
					this.errors = error.error;
					return EMPTY;
				})
			).subscribe(() => {
				this._navigationService.navigateToLogin();
			});
	}
}
