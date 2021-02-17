import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from './templates/navbar/navbar.component';
import { FlexModule } from '@angular/flex-layout';
import { NavbarItemComponent } from './templates/navbar/navbar-item/navbar-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		NavbarItemComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		CoreModule,
		FlexModule,
		BrowserAnimationsModule,
		PerfectScrollbarModule,

	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
