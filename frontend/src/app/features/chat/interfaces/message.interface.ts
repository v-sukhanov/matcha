import { IUser } from '@core/interfaces/user.interface';

export interface IMessage {
	id: string;
	text: string;
	user_id: string;
	chat_id: string;
	date: string;
	fromUser: IUser;
}
