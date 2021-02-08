import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidators } from '../../shared/form-validators.class';
import { Data } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss'],
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
export class ForgotPasswordComponent implements OnInit {
	public form: FormGroup;
	public errors: string[];
	public canGoToEmail: boolean;

	constructor(
		private _dataService: DataService
	) {
		this.form = new FormGroup(
			{
				email: new FormControl('', [Validators.required, FormValidators.emailValidator]),
			}
		);
		this.errors = [];
	}

	ngOnInit(): void {
	}

	public sendLink(): void {
		this._dataService.forgotPassword(this.form.controls.email.value)
			.pipe(
				catchError((errors: string[]) => {
					this.errors = errors;
					return EMPTY;
				})
			)
			.subscribe(() => {
				this.canGoToEmail = true;
			});
	}
}
