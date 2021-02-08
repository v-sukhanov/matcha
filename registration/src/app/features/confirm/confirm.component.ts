import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, pipe } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { DataService } from '../../core/services/data.service';

@Component({
	selector: 'app-confirm',
	templateUrl: './confirm.component.html',
	styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _dataService: DataService
	) { }

	ngOnInit(): void {
		this._route.queryParams
			.pipe(
				take(1),
				switchMap((params) => {
					return this._dataService.confirm(params.hash);
				}),
				catchError((err) => {
					this._router.navigate(['signin']);
					return EMPTY;
				})
			)
			.subscribe(params => {
				this._router.navigate(['signin']);
			});
	}

}
