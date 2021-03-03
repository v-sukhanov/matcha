import { Injectable } from '@angular/core';
import { UserService } from '@core/services/user.service';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';

@Injectable()
export class SocketService {
	public event$: Subject<void>;

	constructor(
		private _userService: UserService,
		private _socket: Socket,
	) {
		this.event$ = new Subject<void>();
		this._userService.user$
			.subscribe(data => {
				this._socket.emit('userId', data.id);
				this._socket.on('message', () => {
					this.event$.next();
				});
			});
	}
}
