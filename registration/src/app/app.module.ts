import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './features/signin/signin.component';
import { SignupComponent } from './features/signup/signup.component';
import { FlexModule } from '@angular/flex-layout';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { RecoveryPasswordComponent } from './features/recovery-password/recovery-password.component';
import { HttpService } from './core/services/http.service';
import { DataService } from './core/services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmComponent } from './features/confirm/confirm.component';
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component';

@NgModule({
	declarations: [
		AppComponent,
		SigninComponent,
		SignupComponent,
		RecoveryPasswordComponent,
		ConfirmComponent,
		ForgotPasswordComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FlexModule,
		MatFormFieldModule,
		MatInputModule,
		BrowserAnimationsModule,
		MatButtonModule,
		ReactiveFormsModule,
		HttpClientModule,
	],
	providers: [
		HttpService,
		DataService
	],
	bootstrap: [AppComponent]

})
export class AppModule {
}
