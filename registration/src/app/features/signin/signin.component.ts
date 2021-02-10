import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EMPTY, pipe, timer } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidators } from '../../shared/form-validators.class';
import { DataService } from '../../core/services/data.service';
import { catchError } from 'rxjs/operators';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.scss'],
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
export class SigninComponent implements OnInit   {
	public form: FormGroup;
	public errors: string[];

	constructor(
		private _dataService: DataService
	) {
		this.form = new FormGroup(
			{
				password: new FormControl('', [Validators.required]),
				username: new FormControl('', [Validators.required]),
			}
		);
		this.errors = [];
	}

	ngOnInit(): void {
	}

	public signin(): void {
		this._dataService.signin(this.form.controls.username.value, this.form.controls.password.value)
			.pipe(
				catchError(({error}) => {
					this.errors = error;
					return EMPTY;
				})
			)
			.subscribe(({ refreshToken, accessToken }) => {
				window.location.href = `http://localhost:4220?access_token=${accessToken}&refresh_token=${refreshToken}`;
			});
	}
}
