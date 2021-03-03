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
import { BrowsingSortComponent } from './browsing-sort/browsing-sort.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { BrowsingFilterComponent } from './browsing-filter/browsing-filter.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { ArrayFilterModule } from '@shared/pipes/array-filter.module';
import { ProfileModule } from '@features/profile/profile.module';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';



@NgModule({
	declarations: [BrowsingComponent, BrowsingPreferenceComponent, BrowsingProfileComponent, BrowsingSortComponent, BrowsingFilterComponent],
	imports: [
		CommonModule,
		BrowsingRoutingModule,
		FlexLayoutModule,
		PerfectScrollbarModule,
		MatIconModule,
		MatChipsModule,
		MatCheckboxModule,
		MatRadioModule,
		MatSliderModule,
		MatInputModule,
		ArrayFilterModule,
		ProfileModule,
		AngularYandexMapsModule
	],
	providers: [
		BrowsingDataService
	]
})
export class BrowsingModule {
}
