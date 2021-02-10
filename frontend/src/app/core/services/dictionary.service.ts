import { Injectable } from '@angular/core';
import { Dictionary } from '@core/models/dictionary/disctionary.model';
import { DictionaryItem } from '@core/models/dictionary/disctionary-item.model';
import { StorageKeyEnum } from '@core/enums/storage-key.enum';
import { PageEnum } from '@core/enums/page.enum';

@Injectable()
export class DictionaryService {
	public localStorage: Dictionary<StorageKeyEnum, string>;
	public navigationPage: Dictionary<PageEnum, string>;

	constructor() {
		this.localStorage = new Dictionary();
		this.navigationPage = new Dictionary<PageEnum, string>();
		this._localStorage();
		this._navigationPage();
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
}
