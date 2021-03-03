import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from 'app/features/notifications/notifications.component';
import { RouterModule } from '@angular/router';
import { NotificationsDataService } from '@features/notifications/services/notifications-data.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
	declarations: [NotificationsComponent],
	imports: [
		CommonModule,
		RouterModule.forChild([{
			path: '',
			component: NotificationsComponent,
		}]),
		FlexLayoutModule,
		MatChipsModule,
		MatIconModule,
	],
	providers: [
		NotificationsDataService
	]
})
export class NotificationsModule {
}
