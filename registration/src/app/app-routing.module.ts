import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './features/signin/signin.component';
import { AppComponent } from './app.component';
import { SignupComponent } from './features/signup/signup.component';

const routes: Routes = [
	{
		path: '',
		component: AppComponent,
		children: [
			{ path: '', redirectTo: 'signup', pathMatch: 'full' },
			{
				path: 'signin',
				component: SigninComponent
			},
			{
				path: 'signup',
				component: SignupComponent
			}
		]
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
