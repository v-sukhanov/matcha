import { GenderEnum } from '@core/enums/gender.enum';
import { ITag } from '@core/interfaces/tag.interface';
import { IPhoto } from '@core/interfaces/photo.interface';
import { SexualPreferenceEnum } from '@core/enums/sexual-preference.enum';

export interface IUser {
	username: string;
	lastName: string;
	firstName: string;
	email: string;
	gender?: GenderEnum;
	age?: number;
	sexualPreference?: SexualPreferenceEnum;
	biography?: string;
	tags?: ITag[];
	photosLink?: IPhoto[];
	avatarLink?: string;
	fameRating: number;
}
