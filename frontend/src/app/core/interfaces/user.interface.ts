import { GenderEnum } from '@core/enums/gender.enum';
import { ITag } from '@core/interfaces/tag.interface';
import { IPhoto } from '@core/interfaces/photo.interface';

export interface IUser {
	username: string;
	lastName: string;
	firstName: string;
	email: string;
	gender?: GenderEnum;
	age?: number;
	sexualPreference?: string;
	biography?: string;
	tags?: ITag[];
	photosLink?: IPhoto[];
	avatarLink?: string;
}
