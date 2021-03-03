import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { ICreateUserParams } from '../models/create-user-params.interface';

@Injectable()
export class DataService {

	constructor(private _httpService: HttpService) {
	}

	public signup(params: ICreateUserParams): Observable<boolean> {
		return this._httpService.post<boolean>('/signup', params);
	}

	public signin(username: string, password: string): Observable<{ accessToken, refreshToken }> {
		return this._httpService.post<{ accessToken, refreshToken }>('/signin', { username, password });
	}

	public confirm(hash: string): Observable<void> {
		return this._httpService.post<void>('/confirm', { hash });
	}

	public forgotPassword(email: string): Observable<void> {
		return this._httpService.post<void>('/forgot', { email });
	}

	public recovery(hash: string, password: string, confirmPassword: string): Observable<void> {
		return this._httpService.post<void>('/recovery', { hash, password, confirmPassword });
	}

	public signInGoogle(email: string, username: string, lastName: string, firstName: string): Observable<{ accessToken, refreshToken }> {
		return this._httpService.post<{ accessToken, refreshToken }>('/google/signin', { email, username, lastName, firstName });
	}
}
