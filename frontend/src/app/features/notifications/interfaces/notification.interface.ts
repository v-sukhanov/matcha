import { NotificationTypeEnum } from '@features/notifications/enums/notification-type.enum';
import { IUser } from '@core/interfaces/user.interface';

export interface INotification {
	date: string;
	from_user_id: string;
	to_user_id: string;
	type: NotificationTypeEnum;
	fromUser: IUser;
}
