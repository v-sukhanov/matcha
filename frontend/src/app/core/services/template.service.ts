import { Inject, Injectable } from '@angular/core';
import { DataService } from '@core/services/data.service';
import { INotificationCounts } from '@core/interfaces/notification.interface';
import { SocketService } from '@core/services/socket.service';
import { AuthenticationService } from '@core/services/authentication.service';

@Injectable()
export class TemplateService {
	public notification: INotificationCounts;
	constructor(
		private _dataService: DataService,
		private _socketService: SocketService,
		private _authService: AuthenticationService
	) {
		this._authService.authenticated$
			.subscribe(() => {
				this.getNotification();
				this._socketService.event$
					.subscribe(() => {
						this.getNotification();
					});
			});
		this.notification = {
			unreadCountMessages: 0,
			unreadCountNotification: 0
		};
	}

	public getNotification(): void {
		this._dataService.getNotification()
			.subscribe(data => {
				this.notification = data;
			});
	}
}
