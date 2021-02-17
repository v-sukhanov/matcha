import { Component, OnInit } from '@angular/core';
import { BrowsingDataService } from '@features/browsing/services/browsing-data.service';
import { IUser } from '@core/interfaces/user.interface';

@Component({
	selector: 'matcha-browsing',
	templateUrl: './browsing.component.html',
	styleUrls: ['./browsing.component.scss']
})
export class BrowsingComponent implements OnInit {
	public preferences: IUser[];

	constructor(
		private _dataService: BrowsingDataService
	) {
		this.preferences = [];
	}

	ngOnInit(): void {
		this._dataService.getPreferences().subscribe(val => {
			this.preferences = val;
		});
	}

}
