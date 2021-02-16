import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from 'app/features/profile/profile.component';
import { UserMapComponent } from './user-map/user-map.component';
import { AgmCoreModule } from '@agm/core';
import { ProfileRoutingModule } from '@features/profile/profile-routing.module';


@NgModule({
	declarations: [ProfileComponent, UserMapComponent],
	imports: [
		CommonModule,
		ProfileRoutingModule,
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyBPhwml6rDNsO0ZgnlgG3HxvCqYlxO8BQI'
		}),
	]
})
export class ProfileModule {
}

