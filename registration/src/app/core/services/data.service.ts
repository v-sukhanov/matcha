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
}
