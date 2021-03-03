import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Subject, timer } from 'rxjs';
import { ChatDataService } from '@features/chat/service/chat-data.service';
import { IMessage } from '@features/chat/interfaces/message.interface';
import { UserService } from '@core/services/user.service';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { SocketService } from '@core/services/socket.service';

@Component({
	selector: 'matcha-current-chat',
	templateUrl: './current-chat.component.html',
	styleUrls: ['./current-chat.component.scss']
})
export class CurrentChatComponent implements OnInit, OnDestroy {
	@ViewChild(PerfectScrollbarComponent) public directiveScroll: PerfectScrollbarComponent | null;
	private _unsub$: Subject<void>;
	public messages: IMessage[];
	public inputText: string;
	public chatId: string;
	public userId: string;

	constructor(
		private _activateRoute: ActivatedRoute,
		private _dataService: ChatDataService,
		private _userService: UserService,
		private _socketService: SocketService
	) {
		this._unsub$ = new Subject<void>();
		this.messages = [];
		this.inputText = '';
		this.chatId = '';
		this.userId = '';
		this.directiveScroll = null;
	}

	ngOnInit(): void {
		this._userService.user$
			.pipe(
				takeUntil(this._unsub$)
			)
			.subscribe(data => {
				this.userId = data.id;
			});
		this._activateRoute.params
			.pipe(
				takeUntil(this._unsub$)
			)
			.subscribe(params => {
				this.chatId = params['id'];
				this._dataService.getMessages(params['id']).subscribe((data) => {
					this.messages = data;
					timer(0).subscribe(() => {
						this.directiveScroll?.directiveRef?.scrollToBottom(0, 0);
					});
				});
			});
		this._socketService.event$
			.pipe(
				takeUntil(this._unsub$)
			)
			.subscribe(() => {
				this._dataService.getMessages(this.chatId).subscribe((data) => {
					this.messages = data;
					timer(0).subscribe(() => {
						this.directiveScroll?.directiveRef?.scrollToBottom(0, 0);
					});
				});
			});
	}

	public ngOnDestroy(): void {
		this._unsub$.next();
		this._unsub$.complete();
	}

	public sendMessage(): void {
		this._dataService.sendMessage(this.userId, this.chatId, this.inputText).subscribe(() => {
			this.inputText = '';
			this._dataService.getMessages(this.chatId).subscribe((data) => {
				this.messages = data;
				timer(0).subscribe(() => {
					this.directiveScroll?.directiveRef?.scrollToBottom(0, 0);
				});
			});
		});
	}
}
