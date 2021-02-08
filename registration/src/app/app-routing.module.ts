import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './features/signin/signin.component';
import { AppComponent } from './app.component';
import { SignupComponent } from './features/signup/signup.component';
import { ConfirmComponent } from './features/confirm/confirm.component';
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component';

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
			},
			{
				path: 'confirm',
				component: ConfirmComponent
			},
			{
				path: 'recovery',
				component: ConfirmComponent
			},
			{
				path: 'forgot',
				component: ForgotPasswordComponent
			}
		]
	},
	{
		path: '*',
		redirectTo: ''
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
