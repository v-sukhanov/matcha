import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsingPreferenceComponent } from './browsing-preference.component';

describe('BrowsingPreferenceComponent', () => {
  let component: BrowsingPreferenceComponent;
  let fixture: ComponentFixture<BrowsingPreferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowsingPreferenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowsingPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
