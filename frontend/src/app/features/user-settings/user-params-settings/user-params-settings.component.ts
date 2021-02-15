import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
	selector: 'matcha-user-params-settings',
	templateUrl: './user-params-settings.component.html',
	styleUrls: ['./user-params-settings.component.scss']
})
export class UserParamsSettingsComponent implements OnInit {
	public expanded: boolean;
	public ageValue: number | null;
	temp = [
		{value: 'steak-0', viewValue: 'Male'},
		{value: 'pizza-1', viewValue: 'Female'},
		{value: 'tacos-2', viewValue: 'None'}
	];

	visible = true;
	selectable = true;
	removable = true;
	addOnBlur = true;
	readonly separatorKeysCodes: number[] = [ENTER, COMMA];
	fruits = [
		{name: '#Lemon'},
		{name: '#Lime'},
		{name: '#Apple'},
	];

	constructor() {
		this.expanded = false;
		this.ageValue = 18;
	}

	ngOnInit(): void {
	}

	add(event: MatChipInputEvent): void {
		const input = event.input;
		const value = event.value;

		// Add our fruit
		if ((value || '').trim()) {
			this.fruits.push({name: '#' + value.trim()});
		}

		// Reset the input value
		if (input) {
			input.value = '';
		}
	}

	remove(fruit: any): void {
		const index = this.fruits.indexOf(fruit);

		if (index >= 0) {
			this.fruits.splice(index, 1);
		}
	}
}
