import { Component, OnInit } from '@angular/core';
import { NotificationsDataService } from '@features/notifications/services/notifications-data.service';
import { INotification } from '@features/notifications/interfaces/notification.interface';
import { GenderEnum } from '@core/enums/gender.enum';
import { NotificationTypeEnum } from '@features/notifications/enums/notification-type.enum';
import { TemplateService } from '@core/services/template.service';

@Component({
	selector: 'matcha-notifications',
	templateUrl: './notifications.component.html',
	styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

	public notifications: INotification[];
	public genderEnum: typeof GenderEnum;
	public notificationTypeEnum: typeof NotificationTypeEnum;

	constructor(
		private _dataService: NotificationsDataService,
		private _templateService: TemplateService
	) {
		this.notifications = [];
		this.genderEnum = GenderEnum;
		this.notificationTypeEnum = NotificationTypeEnum;
	}

	ngOnInit(): void {
		this._dataService.getNotifications().subscribe(data => {
			this.notifications = data;
			this._templateService.getNotification();
		});
	}

}
