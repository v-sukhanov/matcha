import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserSettingsDataService } from '@features/user-settings/services/user-settings-data.service';
import { UserService } from '@core/services/user.service';
import { IPhoto } from '@core/interfaces/photo.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'matcha-photos-settings',
	templateUrl: './photos-settings.component.html',
	styleUrls: ['./photos-settings.component.scss']
})
export class PhotosSettingsComponent implements OnInit, OnDestroy {
	public photosLink?: IPhoto[];
	public photoLength: number;
	private _unsub$: Subject<void>;

	constructor(
		private _dataService: UserSettingsDataService,
		public userService: UserService
	) {
		this._unsub$ = new Subject<void>();
		this.photoLength = 0;
	}

	ngOnInit(): void {
		this.userService.user$
			.pipe(
				takeUntil(this._unsub$)
			)
			.subscribe((user) => {
				if (user.photosLink) {
					this.photosLink = user.photosLink;
					this.photoLength = this.photosLink.length;
				}
			});
	}

	public ngOnDestroy(): void {
		this._unsub$.next();
		this._unsub$.complete();
	}

	public uploadAvatar(file: FileList | null): void {
		if (file && file[0]) {
			this._dataService.setUserAvatar(file).subscribe(() => this.userService.getUser());
		}
	}

	public uploadOtherPhoto(file: FileList | null): void {
		if (file && file[0]) {
			this._dataService.setUserPhoto(file).subscribe(() => this.userService.getUser());
		}
	}

	public deletePhoto(id: string): void {
		this._dataService.deletePhoto(id).subscribe(() => this.userService.getUser());
	}

	public deleteAvatar(): void {
		this._dataService.deleteAvatar().subscribe(() => this.userService.getUser());
	}
}
