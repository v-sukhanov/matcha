import { GenderEnum } from '@core/enums/gender.enum';

export interface IUser {
	username: string;
	lastName: string;
	firstName: string;
	email: string;
	gender?: GenderEnum;
	sexualPreferences?: string;
	biography: string;
	tags: string[];
	photosLink: string[];
	profilePictureLink: string;
}
