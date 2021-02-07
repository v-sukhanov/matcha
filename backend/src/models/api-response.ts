import { ApiError } from './api-error';

export class ApiResponse<TResponse> {
	public data?: TResponse;
	public error?: ApiError;

	constructor(init?: Partial<ApiResponse<TResponse>>) {
		Object.assign(this, init);
	}
}
