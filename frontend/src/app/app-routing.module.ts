import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { UserSettingsComponent } from '@features/user-settings/user-settings.component';

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'settings',
				loadChildren: () => import('@features/user-settings/user-settings.module').then(m => m.UserSettingsModule)
			},
			{
				path: 'profile',
				loadChildren: () => import('@features/profile/profile.module').then(m => m.ProfileModule)
			},
			{
				path: 'browsing',
				loadChildren: () => import('@features/browsing/browsing.module').then(m => m.BrowsingModule)
			},
			{
				path: 'history',
				loadChildren: () => import('@features/visit-history/visit-history.module').then(m => m.VisitHistoryModule)
			},
			{
				path: '',
				redirectTo: 'settings',
				pathMatch: 'prefix'
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
