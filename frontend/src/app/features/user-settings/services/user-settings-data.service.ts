import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { IUser } from '@core/interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable()
export class UserSettingsDataService {

	constructor(private _httpService: HttpService) {
	}

	public editPassword(oldPassword: string, newPassword: string, repeatNewPassword: string): Observable<void> {
		return this._httpService.post<void>('user/password/edit', { oldPassword, newPassword, repeatNewPassword });
	}

	public editAccountSettings(email: string, username: string, firstName: string, lastName: string): Observable<void> {
		return this._httpService.post<void>('user/account/edit', { email, username, firstName, lastName });
	}
}
