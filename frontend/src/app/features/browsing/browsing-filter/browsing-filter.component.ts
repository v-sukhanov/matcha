import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { ITag } from '@core/interfaces/tag.interface';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { IBrowsingFilter } from '@features/browsing/interfaces/browsing-filter.interface';

@Component({
	selector: 'matcha-browsing-filter',
	templateUrl: './browsing-filter.component.html',
	styleUrls: ['./browsing-filter.component.scss']
})
export class BrowsingFilterComponent implements OnInit {
	@Input() public browsingFilter: IBrowsingFilter;
	readonly separatorKeysCodes: number[] = [ENTER, COMMA];

	@Output() public applyFilter: EventEmitter<void>;

	constructor() {
		this.browsingFilter = {
			distance: {
				min: 0,
				max: 20000,
				selectedMin: 0,
				selectedMax: 20000,
			},
			age: {
				min: 18,
				max: 100,
				selectedMin: 18,
				selectedMax: 100
			},
			fameRating: {
				min: 0,
				max: 100000,
				selectedMin: 0,
				selectedMax: 100000
			},
			tags: []
		};
		this.applyFilter = new EventEmitter<void>();
	}

	ngOnInit(): void {
	}

	public add(event: MatChipInputEvent): void {
		const input = event.input;
		const value = event.value;

		// Add our fruit
		if ((value || '').trim()) {
			this.browsingFilter.tags.push({ text: '#' + value.trim() });
		}

		// Reset the input value
		if (input) {
			input.value = '';
		}
	}

	public remove(val: any): void {
		const index = this.browsingFilter.tags.indexOf(val);

		if (index >= 0) {
			this.browsingFilter.tags.splice(index, 1);
		}
	}
}
