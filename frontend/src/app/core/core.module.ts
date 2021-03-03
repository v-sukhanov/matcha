import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DictionaryService } from './services/dictionary.service';
import { LocalstorageService } from './services/localstorage.service';
import { NavigationService } from '@core/services/navigation.service';
import { AuthenticationService } from '@core/services/authentication.service';
import { UserService } from '@core/services/user.service';
import { DataService } from '@core/services/data.service';
import { HttpService } from '@core/services/http.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpHeaderInterceptor } from '@core/interceptors/http-header.interceptor';
import { AuthInterceptor } from '@core/interceptors/auth.interceptor';
import { TemplateService } from '@core/services/template.service';
import { SocketService } from '@core/services/socket.service';


@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		HttpClientModule
	],
	providers: [
		DictionaryService,
		LocalstorageService,
		NavigationService,
		AuthenticationService,
		UserService,
		DataService,
		HttpService,
		TemplateService,
		SocketService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpHeaderInterceptor,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		}
	]
})
export class CoreModule {
}
