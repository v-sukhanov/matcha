import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { IUser } from '@core/interfaces/user.interface';
import { Observable } from 'rxjs';
import { INotification } from '@features/notifications/interfaces/notification.interface';


@Injectable()
export class NotificationsDataService {

	constructor(private _httpService: HttpService) {
	}

	public getNotifications(): Observable<INotification[]> {
		return this._httpService.get<INotification[]>('user/notifications');
	}
}
