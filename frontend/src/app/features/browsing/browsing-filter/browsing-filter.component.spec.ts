import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsingFilterComponent } from './browsing-filter.component';

describe('BrowsingFilterComponent', () => {
  let component: BrowsingFilterComponent;
  let fixture: ComponentFixture<BrowsingFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowsingFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowsingFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
