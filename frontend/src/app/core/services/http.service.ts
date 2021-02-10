import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '@env';
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

	public get<TResponse = any, TRequest = any>(url: string, model: TRequest | null = null)
		: Observable<TResponse> {
		let request: Observable<TResponse>;
		request = this._httpClient.get<TResponse>(
			`${environment.api}${url}`,
			{
				headers: this._commonHeaders(),
				params: this._getParams(model)
			});

		return this._handleStandartRequest(request);
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

	private _getParams<TSource>(source: TSource): HttpParams {
		let params = new HttpParams();
		if (source === null) {
			return params;
		}

		Object.keys(source).forEach(key => {
			// @ts-ignore
			const value = source[key];
			if (value instanceof Date) {
				params = params.append(key, value.toISOString());
			}
			else if (value instanceof Array) {
				for (let i = 0; i < value.length; i++) {
					params = params.append(`${key}[${i}]`, value[i]);
				}
			} else {
				const val = value ? value : '';
				params = params.append(key, val);
			}
		});

		return params;
	}
}
