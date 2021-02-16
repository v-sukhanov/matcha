import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { IUser } from '@core/interfaces/user.interface';
import { Observable } from 'rxjs';
import { GenderEnum } from '@core/enums/gender.enum';
import { ITag } from '@core/interfaces/tag.interface';

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

	public editUserParamsSettings(age: number, gender: GenderEnum, sexualPreference: GenderEnum, biography: string, tags: ITag[])
		: Observable<void> {
		return this._httpService.post<void>('user/params/edit', { age, gender, sexualPreference, biography, tags });
	}

	public setUserAvatar(file: FileList): Observable<void> {
		return this._httpService.uploadFile<void>('user/avatar', file[0]);
	}

	public setUserPhoto(file: FileList): Observable<void> {
		return this._httpService.uploadFile<void>('user/photo', file[0]);
	}

	public deletePhoto(id: string): Observable<void> {
		return this._httpService.post<void>('user/photo/delete', { id });
	}
}
