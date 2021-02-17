import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowsingComponent } from 'app/features/browsing/browsing.component';
import { BrowsingRoutingModule } from '@features/browsing/browsing-routing.module';
import { BrowsingDataService } from '@features/browsing/services/browsing-data.service';
import { BrowsingPreferenceComponent } from './browsing-preference/browsing-preference.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { BrowsingProfileComponent } from './browsing-profile/browsing-profile.component';


@NgModule({
	declarations: [BrowsingComponent, BrowsingPreferenceComponent, BrowsingProfileComponent],
	imports: [
		CommonModule,
		BrowsingRoutingModule,
		FlexLayoutModule,
		PerfectScrollbarModule,
		MatIconModule,
		MatChipsModule
	],
	providers: [
		BrowsingDataService
	]
})
export class BrowsingModule {
}
