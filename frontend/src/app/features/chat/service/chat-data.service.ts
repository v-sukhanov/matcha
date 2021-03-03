import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { Observable } from 'rxjs';
import { IChat } from '@features/chat/interfaces/chat.interface';
import { IMessage } from '@features/chat/interfaces/message.interface';


@Injectable()
export class ChatDataService {

	constructor(private _httpService: HttpService) {
	}

	public getChats(): Observable<IChat[]> {
		return this._httpService.get<IChat[]>('user/chats');
	}

	public getMessages(chatId: string): Observable<IMessage[]> {
		return this._httpService.get<IMessage[]>('user/messages/get', { chatId });
	}

	public sendMessage(userId: string, chatId: string, text: string): Observable<void> {
		return this._httpService.post<void>('user/messages/send', { userId, chatId, text });
	}
}
