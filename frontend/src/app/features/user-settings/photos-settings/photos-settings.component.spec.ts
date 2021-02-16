import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosSettingsComponent } from './photos-settings.component';

describe('PhotosSettingsComponent', () => {
  let component: PhotosSettingsComponent;
  let fixture: ComponentFixture<PhotosSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotosSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
