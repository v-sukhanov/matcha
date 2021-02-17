import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { IUser } from '@core/interfaces/user.interface';
import { Observable } from 'rxjs';


@Injectable()
export class VisitHistoryDataService {

	constructor(private _httpService: HttpService) {
	}

	public getVisitsProfiles(): Observable<IUser[]> {
		return this._httpService.get<IUser[]>('user/visits');
	}
}
