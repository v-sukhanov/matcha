import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserSettingsComponent } from '@features/user-settings/user-settings.component';

const routes: Routes = [
	{
		path: '',
		component: UserSettingsComponent,
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
export class UserSettingsRoutingModule {
}
