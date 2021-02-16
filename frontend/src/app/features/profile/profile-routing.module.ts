import { ProfileComponent } from '@features/profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: ProfileComponent,
	}
];

@NgModule({
	declarations: [],
	imports: [
		RouterModule.forChild(routes),
	],
	exports: [
		RouterModule
	]
})
export class ProfileRoutingModule {
}
