import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioChange } from '@angular/material/radio';

@Component({
	selector: 'matcha-browsing-sort',
	templateUrl: './browsing-sort.component.html',
	styleUrls: ['./browsing-sort.component.scss']
})
export class BrowsingSortComponent implements OnInit {

	@Output() public applySort: EventEmitter<MatRadioChange>;

	constructor() {
		this.applySort = new EventEmitter<MatRadioChange>();
	}

	ngOnInit(): void {
	}

}
