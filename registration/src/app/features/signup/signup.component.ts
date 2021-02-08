import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidators } from '../../shared/form-validators.class';
import { DataService } from '../../core/services/data.service';
import { EMPTY, pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss'],
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
export class SignupComponent implements OnInit {
	public form: FormGroup;
	public emailControl: FormControl;
	public passwordControl: FormControl;
	public confirmPasswordControl: FormControl;
	public usernameControl: FormControl;
	public lastNameControl: FormControl;
	public firstNameControl: FormControl;

	public errors: string[];
		public loading: boolean;

	constructor(private _dataService: DataService, private _router: Router) {
		this.emailControl = new FormControl('', [Validators.required, FormValidators.emailValidator]);
		this.passwordControl = new FormControl('', [Validators.required, FormValidators.passValidator]);
		this.confirmPasswordControl = new FormControl('', [Validators.required, FormValidators.passValidator]);
		this.usernameControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
		this.lastNameControl = new FormControl('', [Validators.required]);
		this.firstNameControl = new FormControl('', [Validators.required]);
		this.form = new FormGroup(
			{
				email: this.emailControl,
				password: this.passwordControl,
				confirmPassword: this.confirmPasswordControl,
				username: this.usernameControl,
				lastName: this.lastNameControl,
				firstName: this.firstNameControl
			}
		);
		this.errors = [];
		this.loading = false;
	}

	ngOnInit(): void {
	}

	private _createNewForm(): void {
		this.emailControl = new FormControl('', [Validators.required, FormValidators.emailValidator]);
		this.passwordControl = new FormControl('', [Validators.required, FormValidators.passValidator]);
		this.confirmPasswordControl = new FormControl('', [Validators.required, FormValidators.passValidator]);
		this.usernameControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
		this.lastNameControl = new FormControl('', [Validators.required]);
		this.firstNameControl = new FormControl('', [Validators.required]);
		this.form = new FormGroup(
			{
				email: this.emailControl,
				password: this.passwordControl,
				confirmPassword: this.confirmPasswordControl,
				username: this.usernameControl,
				lastName: this.lastNameControl,
				firstName: this.firstNameControl
			}
		);
	}

	public signup(): void {
		this.errors = [];

		this._dataService.signup({
			email: this.emailControl.value,
			password: this.passwordControl.value,
			confirmPassword: this.confirmPasswordControl.value,
			username: this.usernameControl.value,
			lastName: this.lastNameControl.value,
			firstName: this.firstNameControl.value
		})
			.pipe(
				catchError(({ error }) => {
					this._createNewForm();
					this.errors = error;
					return EMPTY;
				})
			)
			.subscribe(() => {
				this._router.navigate(['signin']);
			});
	}
}

