import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from 'app/features/profile/profile.component';
import { UserMapComponent } from './user-map/user-map.component';
import { ProfileRoutingModule } from '@features/profile/profile-routing.module';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';



@NgModule({
	declarations: [ProfileComponent, UserMapComponent],
	imports: [
		CommonModule,
		ProfileRoutingModule,
		AngularYandexMapsModule.forRoot({
			apikey: 'b29ff156-ff39-4f3c-a18a-47b815b15990',
			lang: 'ru_RU',
		}),
		FlexLayoutModule,
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		MatChipsModule,
		MatIconModule,
		PerfectScrollbarModule,
	]
})
export class ProfileModule {
}

