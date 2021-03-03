import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatDataService } from '@features/chat/service/chat-data.service';
import { IChat } from '@features/chat/interfaces/chat.interface';
import { TemplateService } from '@core/services/template.service';
import { SocketService } from '@core/services/socket.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'matcha-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
	public chats: IChat[];
	private _unsub$: Subject<void>;

	constructor(
		private _dataService: ChatDataService,
		private _templateService: TemplateService,
		private _socketService: SocketService
	) {
		this.chats = [];
		this._unsub$ = new Subject<void>();
	}

	ngOnInit(): void {
		this._dataService.getChats().subscribe(data => {
			this.chats = data;
			this._templateService.getNotification();
		});
		this._socketService.event$
			.pipe(
				takeUntil(this._unsub$)
			)
			.subscribe(() => {
				this._dataService.getChats().subscribe(data => {
					this.chats = data;
					this._templateService.getNotification();
				});
			});
	}

	public ngOnDestroy(): void {
		this._unsub$.next();
		this._unsub$.complete();
	}
}
