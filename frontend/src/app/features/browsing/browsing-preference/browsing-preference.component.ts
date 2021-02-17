import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '@core/interfaces/user.interface';
import { GenderEnum } from '@core/enums/gender.enum';

@Component({
	selector: 'matcha-browsing-preference',
	templateUrl: './browsing-preference.component.html',
	styleUrls: ['./browsing-preference.component.scss']
})
export class BrowsingPreferenceComponent implements OnInit {
	@Input() public preference?: IUser;
	public genderEnum: typeof GenderEnum;

	constructor() {
		this.genderEnum = GenderEnum;
	}

	ngOnInit(): void {
	}

}
