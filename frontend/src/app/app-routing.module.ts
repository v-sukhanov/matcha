import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
				path: 'chat',
				loadChildren: () => import('@features/chat/chat.module').then(m => m.ChatModule)
			},
			{
				path: 'notifications',
				loadChildren: () => import('@features/notifications/notifications.module').then(m => m.NotificationsModule)
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
