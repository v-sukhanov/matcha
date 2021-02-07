import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidators } from '../../shared/form-validators.class';

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit   {
	public form: FormGroup;

	constructor(
	) {
		this.form = new FormGroup(
			{
				password: new FormControl('', [Validators.required]),
				username: new FormControl('', [Validators.required]),
			}
		);
	}

	ngOnInit(): void {
	}

}
