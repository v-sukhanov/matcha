import { Component, OnInit } from '@angular/core';
import { VisitHistoryDataService } from '@features/visit-history/services/visit-history-data.service';
import { IUser } from '@core/interfaces/user.interface';
import { GenderEnum } from '@core/enums/gender.enum';

@Component({
	selector: 'matcha-visit-history',
	templateUrl: './visit-history.component.html',
	styleUrls: ['./visit-history.component.scss']
})
export class VisitHistoryComponent implements OnInit {
	public visits: IUser[];
	public genderEnum: typeof GenderEnum;

	constructor(
		private _dataService: VisitHistoryDataService
	) {
		this.visits = [];
		this.genderEnum = GenderEnum;
	}

	ngOnInit(): void {
		this._dataService.getVisitsProfiles().subscribe((data) => this.visits = data);
	}

}
