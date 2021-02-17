import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl, FormGroup } from '@angular/forms';
import { GenderEnum } from '@core/enums/gender.enum';
import { UserService } from '@core/services/user.service';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from '@core/services/data.service';
import { UserSettingsDataService } from '@features/user-settings/services/user-settings-data.service';
import { ITag } from '@core/interfaces/tag.interface';
import { animate, style, transition, trigger } from '@angular/animations';
import { DictionaryItem } from '@core/models/dictionary/disctionary-item.model';
import { DictionaryService } from '@core/services/dictionary.service';

interface IGenderSelector {
	value: GenderEnum;
	viewValue: string;
}


@Component({
	selector: 'matcha-user-params-settings',
	templateUrl: './user-params-settings.component.html',
	styleUrls: ['./user-params-settings.component.scss'],
	animations: [
		trigger('anim', [
			transition('void => *', [
				style({
					height: '0px',
					opacity: '0',
					overflow: 'hidden'
				}),
				animate('150ms ease-out', style({
					height: '*',
					opacity: '*'
				}))
			]),
			transition('* => void', [
				style({
					height: '*',
					opacity: '*'
				}),
				animate('150ms ease-out', style({
					height: '0px',
					opacity: '0',
					overflow: 'hidden'
				}))
			]),
		])
	]
})
export class UserParamsSettingsComponent implements OnInit, OnDestroy {
	public expanded: boolean;
	private _unsub$: Subject<void>;
	public profileChanged: boolean;

	public form: FormGroup;

	readonly separatorKeysCodes: number[] = [ENTER, COMMA];
	public tags: ITag[];

	constructor(
		private _userService: UserService,
		private _dataService: UserSettingsDataService,
		public dictionaryService: DictionaryService
	) {
		this.profileChanged = false;
		this.expanded = true;
		this._unsub$ = new Subject<void>();
		this.tags = [];
		this.form = new FormGroup({
			age: new FormControl(),
			gender: new FormControl(),
			sexualPreference: new FormControl(),
			biography: new FormControl()
		});
	}

	public ngOnInit(): void {
		this._userService.user$
			.pipe(
				takeUntil(this._unsub$)
			)
			.subscribe((user) => {
				this.form = new FormGroup({
					age: new FormControl(user.age),
					gender: new FormControl(user.gender),
					sexualPreference: new FormControl(user.sexualPreference),
					biography: new FormControl(user.biography)
				});
				if (user.tags) {
					this.tags = user.tags;
				}
			});
	}

	public ngOnDestroy(): void {
		this._unsub$.next();
		this._unsub$.complete();
	}

	public add(event: MatChipInputEvent): void {
		const input = event.input;
		const value = event.value;

		// Add our fruit
		if ((value || '').trim()) {
			this.tags.push({ text: '#' + value.trim() });
		}

		// Reset the input value
		if (input) {
			input.value = '';
		}
	}

	public remove(val: any): void {
		const index = this.tags.indexOf(val);

		if (index >= 0) {
			this.tags.splice(index, 1);
		}
	}

	public editUserParamsSettings(): void {
		const { age, gender, sexualPreference, biography } = this.form.controls;
		this._dataService.editUserParamsSettings(age.value, gender.value, sexualPreference.value, biography.value?.trim(), this.tags)
			.subscribe(() => {
				this._userService.getUser();
				this.profileChanged = true;
				timer(10000).subscribe(() => this.profileChanged = false);
			});
	}
}
