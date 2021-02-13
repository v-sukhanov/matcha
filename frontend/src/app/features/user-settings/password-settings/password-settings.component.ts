import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'matcha-password-settings',
	templateUrl: './password-settings.component.html',
	styleUrls: ['./password-settings.component.scss']
})
export class PasswordSettingsComponent implements OnInit {
	public expanded: boolean;

	constructor() {
		this.expanded = false;
	}

	ngOnInit(): void {
	}

}
