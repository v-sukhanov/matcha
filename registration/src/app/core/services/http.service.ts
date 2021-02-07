import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';

export class ApiError {
	public messages?: string[];

	constructor(init?: Partial<ApiError>) {
		Object.assign(this, init);
	}
}

export class ApiResponse<TResponse> {
	public data?: TResponse;
	public error?: ApiError;

	constructor(init?: Partial<ApiResponse<TResponse>>) {
		Object.assign(this, init);
	}
}


@Injectable()
export class HttpService {

	constructor(private _httpClient: HttpClient) {
	}

	public post<TResponse = any, TRequest = any>(url: string, model: TRequest): Observable<TResponse> {
		const request = this._httpClient.post<TResponse>(
			`${environment.api}${url}`, model,
			{
				headers: this._commonHeaders()
			});

		return this._handleStandartRequest(request);
	}

	private _commonHeaders(): HttpHeaders {
		const headers = new HttpHeaders()
			.append('X-Requested-With', 'XMLHttpRequest')
			.append('Content-Type', 'application/json');

		return headers;
	}

	private _handleStandartRequest<TResponse>(source: Observable<TResponse>): Observable<TResponse> {
		return source.pipe(
			map(resp => {
				const temp = new ApiResponse<TResponse>(resp);

				if (temp.data) {
					return temp.data;
				}

				if (temp.error) {
					throw new ApiError(temp.error);
				}

				return resp;
			})
		);
	}
}
