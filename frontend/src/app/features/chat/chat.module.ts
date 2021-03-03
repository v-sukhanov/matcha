import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from 'app/features/chat/chat.component';
import { Router, RouterModule } from '@angular/router';
import { ChatDataService } from '@features/chat/service/chat-data.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CurrentChatComponent } from './current-chat/current-chat.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';


@NgModule({
	declarations: [ChatComponent, CurrentChatComponent],
	imports: [
		CommonModule,
		RouterModule.forChild([
			{
				path: 'current/:id',
				component: CurrentChatComponent
			},
			{
				path: 'list',
				component: ChatComponent
			},
			{
				path: '',
				redirectTo: 'list'
			}
		]),
		FlexLayoutModule,
		MatInputModule,
		FormsModule,
		PerfectScrollbarModule
	],
	providers: [
		ChatDataService
	]
})
export class ChatModule {
}
