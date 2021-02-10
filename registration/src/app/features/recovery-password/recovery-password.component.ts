import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidators } from '../../shared/form-validators.class';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { DataService } from '../../core/services/data.service';

@Component({
	selector: 'app-recovery-password',
	templateUrl: './recovery-password.component.html',
	styleUrls: ['./recovery-password.component.scss']
})
export class RecoveryPasswordComponent implements OnInit {
	public form: FormGroup;
	public errors: string[];
	private _hash: string;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _dataService: DataService
	) {
		this.form = new FormGroup(
			{
				password: new FormControl('', [Validators.required, FormValidators.passValidator]),
				confirmPassword: new FormControl('', [Validators.required, FormValidators.passValidator]),
			}
		);
		this.errors = [];
	}

	ngOnInit(): void {
		this._route.queryParams
			.pipe(
				take(1)
			)
			.subscribe(params => {
				this._hash = params.hash;
				if (!this._hash) {
					this._router.navigate(['signin']);
				}
			});
	}

	public recovery(): void {
		this._dataService.recovery(this._hash, this.form.controls.password.value, this.form.controls.confirmPassword.value).subscribe(() => {
			this._router.navigate(['signin']);
		});
	}
}
