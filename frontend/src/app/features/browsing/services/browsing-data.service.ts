import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { Observable } from 'rxjs';
import { IUser } from '@core/interfaces/user.interface';


@Injectable()
export class BrowsingDataService {

	constructor(private _httpService: HttpService) {
	}

	public getPreferences(): Observable<IUser[]> {
		return this._httpService.get<IUser[]>('user/preferences/get');
	}

	public getPreferenceInfo(username: string): Observable<IUser> {
		return this._httpService.get<IUser>('user/preference/info', {username});
	}
}
