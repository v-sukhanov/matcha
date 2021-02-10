import { Injectable } from '@angular/core';
import { DictionaryService } from './dictionary.service';
import { StorageKeyEnum } from '@core/enums/storage-key.enum';

@Injectable()
export class LocalstorageService {
	constructor(
		private _dictionaryService: DictionaryService
	) {
	}

	/**
	 * Get value from localStorage
	 * @param key type StorageKeyType
	 * @returns string from localStorage
	 */
	public getStorageStringItem(key: StorageKeyEnum): string | null {
		if (!key) {
			return null;
		}
		const val = this._dictionaryService.localStorage.getValue(key);
		return val ? localStorage.getItem(val) : null;
	}

	public getStorageJsonItem<TValue>(key: StorageKeyEnum): TValue | null {
		const val = this._dictionaryService.localStorage.getValue(key);
		const storageVal = val ? localStorage.getItem(val) : null;
		return val && storageVal ? JSON.parse(storageVal) : null;
	}

	public setStorageValue<TValue>(key: StorageKeyEnum, value: TValue): void {
		if (!key || !value) {
			return;
		}
		let stringValue: string;
		if (typeof (value) !== 'string') {
			stringValue = JSON.stringify(value);
		} else {
			stringValue = value;
		}
		const val = this._dictionaryService.localStorage.getValue(key);
		if (!val) {
			return ;
		}
		localStorage.setItem(val, stringValue);
	}

	public removeItem(key: StorageKeyEnum): void {
		if (!key) {
			return;
		}
		const val = this._dictionaryService.localStorage.getValue(key);
		if (!val) {
			return ;
		}
		localStorage.removeItem(val);
	}
}
