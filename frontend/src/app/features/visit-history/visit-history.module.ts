import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserSettingsComponent } from '@features/user-settings/user-settings.component';
import { VisitHistoryComponent } from '@features/visit-history/visit-history.component';
import { VisitHistoryDataService } from '@features/visit-history/services/visit-history-data.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';


@NgModule({
	declarations: [VisitHistoryComponent],
	imports: [
		CommonModule,
		RouterModule.forChild([{
			path: '',
			component: VisitHistoryComponent,
		}]),
		FlexLayoutModule,
		MatIconModule,
		MatChipsModule
	],
	providers: [
		VisitHistoryDataService,
	]
})
export class VisitHistoryModule {
}
