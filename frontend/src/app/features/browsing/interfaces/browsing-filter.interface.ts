import { ITag } from '@core/interfaces/tag.interface';

export interface IBrowserFilterItem {
	min: number;
	max: number;
	selectedMin: number;
	selectedMax: number;
}

export interface IBrowsingFilter {
	distance: IBrowserFilterItem;
	age: IBrowserFilterItem;
	fameRating: IBrowserFilterItem;
	tags: ITag[];
}
