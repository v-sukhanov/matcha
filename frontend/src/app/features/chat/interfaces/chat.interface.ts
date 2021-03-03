import { IUser } from '@core/interfaces/user.interface';
import { IMessage } from '@features/chat/interfaces/message.interface';

export interface IChat {
	chat_id: string;
	user_id: string;
	fromUser: IUser;
	lastMessage: IMessage;
}
