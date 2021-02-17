import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowsingComponent } from '@features/browsing/browsing.component';
import { BrowsingProfileComponent } from '@features/browsing/browsing-profile/browsing-profile.component';

const routes: Routes = [
	{
		path: '',
		component: BrowsingComponent,
	},
	{
		path: 'user/:username',
		component: BrowsingProfileComponent
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
export class BrowsingRoutingModule {
}
