import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsingProfileComponent } from './browsing-profile.component';

describe('BrowsingProfileComponent', () => {
  let component: BrowsingProfileComponent;
  let fixture: ComponentFixture<BrowsingProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowsingProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowsingProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
