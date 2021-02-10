export class DictionaryItem<TKey, TData> {
	public key: TKey;
	public data: TData;

	constructor(key: TKey, data: TData) {
		this.key = key;
		this.data = data;
	}
}
