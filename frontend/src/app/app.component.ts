import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '@core/services/authentication.service';
import { UserService } from '@core/services/user.service';
import { HttpClient } from '@angular/common/http';
import { DataService } from '@core/services/data.service';
import { Socket } from 'ngx-socket-io';
import { TemplateService } from '@core/services/template.service';
import { SocketService } from '@core/services/socket.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	public menuOpen: boolean;

	constructor(
		private _authService: AuthenticationService,
		private _userService: UserService,
		private _httpClient: HttpClient,
		private _dataService: DataService,
		private _socket: Socket,
		private _templateService: TemplateService,
		private _socketService: SocketService
	) {
		this.menuOpen = false;
	}

	public ngOnInit(): void {

	}


}

