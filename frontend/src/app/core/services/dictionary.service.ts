import { Injectable } from '@angular/core';
import { Dictionary } from '@core/models/dictionary/disctionary.model';
import { DictionaryItem } from '@core/models/dictionary/disctionary-item.model';
import { StorageKeyEnum } from '@core/enums/storage-key.enum';
import { PageEnum } from '@core/enums/page.enum';
import { GenderEnum } from '@core/enums/gender.enum';
import { SexualPreferenceEnum } from '@core/enums/sexual-preference.enum';

@Injectable()
export class DictionaryService {
	public localStorage: Dictionary<StorageKeyEnum, string>;
	public navigationPage: Dictionary<PageEnum, string>;
	public genders: Dictionary<GenderEnum, string>;
	public sexualPreferences: Dictionary<SexualPreferenceEnum, string>;

	constructor() {
		this.localStorage = new Dictionary();
		this.navigationPage = new Dictionary<PageEnum, string>();
		this.genders = new Dictionary<GenderEnum, string>();
		this.sexualPreferences = new Dictionary<SexualPreferenceEnum, string>();
		this._localStorage();
		this._navigationPage();
		this._genders();
		this._sexualPreferences();
	}

	private _localStorage(): void {
		this.localStorage.addItem(
			new DictionaryItem<StorageKeyEnum, string>(StorageKeyEnum.AccessToken, 'ACCESS_TOKEN')
		);
		this.localStorage.addItem(
			new DictionaryItem<StorageKeyEnum, string>(StorageKeyEnum.RefreshToken, 'REFRESH_TOKEN')
		);
	}

	private _navigationPage(): void {
	}

	private _genders(): void {
		this.genders.addItem(
			new DictionaryItem<GenderEnum, string>(GenderEnum.Female, 'female')
		);
		this.genders.addItem(
			new DictionaryItem<GenderEnum, string>(GenderEnum.Male, 'male')
		);
		this.genders.addItem(
			new DictionaryItem<GenderEnum, string>(GenderEnum.None, 'none')
		);
	}

	public _sexualPreferences(): void {
		this.sexualPreferences.addItem(
			new DictionaryItem<SexualPreferenceEnum, string>(SexualPreferenceEnum.Female, 'female')
		);
		this.sexualPreferences.addItem(
			new DictionaryItem<SexualPreferenceEnum, string>(SexualPreferenceEnum.Male, 'male')
		);
		this.sexualPreferences.addItem(
			new DictionaryItem<SexualPreferenceEnum, string>(SexualPreferenceEnum.BiSexual, 'bisexual')
		);
	}
}
