import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { IUser } from '@core/interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {

	constructor(private _httpService: HttpService) {
	}

	public getUser(): Observable<IUser> {
		return this._httpService.get<IUser>('user/info');
	}

	public tryRefreshToken(refreshToken: string, accessToken: string): Observable<{ accessToken: string, refreshToken: string }> {
		return this._httpService.post<{ accessToken: string, refreshToken: string }>('tokens/update', { refreshToken, accessToken });
	}

	public setLocation(longitude: number, latitude: number): Observable<void> {
		return this._httpService.post<void>('user/location', { longitude, latitude });
	}
}
