import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from './templates/navbar/navbar.component';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { NavbarItemComponent } from './templates/navbar/navbar-item/navbar-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';

const config: SocketIoConfig = { url: 'http://localhost:5000/', options: {} };

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		NavbarItemComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		CoreModule,
		FlexModule,
		BrowserAnimationsModule,
		PerfectScrollbarModule,
		MatBadgeModule,
		SocketIoModule.forRoot(config),
		MatIconModule,
		FlexLayoutModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
