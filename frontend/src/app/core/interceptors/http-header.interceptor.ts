import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalstorageService } from '@core/services/localstorage.service';
import { StorageKeyEnum } from '@core/enums/storage-key.enum';


@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {

	constructor(private _storageService: LocalstorageService) {
	}

	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		if (!req.url.includes('RefreshToken') && !req.url.includes('94.159.91.198')) {

			const accessToken = this._storageService.getStorageStringItem(StorageKeyEnum.AccessToken);
			if (accessToken) {
				const cloned = req.clone({
					headers: req.headers.set('Authorization', 'Bearer ' + accessToken)
				});

				return next.handle(cloned);
			}
		}

		return next.handle(req);
	}
}
