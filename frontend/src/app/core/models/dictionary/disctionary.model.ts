import { DictionaryItem } from './disctionary-item.model';

export class Dictionary<TKey, TData> {
	private _items: DictionaryItem<TKey, TData>[];

	constructor() {
		this._items = [];
	}

	public addItem(item: DictionaryItem<TKey, TData>): void {
		this._items.push(item);
	}

	public getValue(key: TKey | undefined): TData | null {
		const temp = this._items.find(c => c.key === key);
		return temp ? temp.data : null;
	}

	public getItem(key: TKey | null): DictionaryItem<TKey, TData> | null {
		const item = this._items.find(c => c.key === key);
		return item ? item : null;
	}

	public getValues(): (TData | null)[] | null {
		const val = this._items.map(x => this.getValue(x.key));
		return val ? val : null;
	}

	public getKeys(): TKey[] {
		return this._items.map(x => x.key);
	}

	public getAll(): DictionaryItem<TKey, TData>[] {
		return this._items;
	}
}
