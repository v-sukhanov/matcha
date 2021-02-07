export class ApiError {
	public messages?: string[];

	constructor(init?: Partial<ApiError>) {
		Object.assign(this, init);
	}
}
