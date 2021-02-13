import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserParamsSettingsComponent } from 'app/features/user-settings/user-params-settings/user-params-settings.component';

describe('UserparamsSettinsComponent', () => {
  let component: UserParamsSettingsComponent;
  let fixture: ComponentFixture<UserParamsSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserParamsSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserParamsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
