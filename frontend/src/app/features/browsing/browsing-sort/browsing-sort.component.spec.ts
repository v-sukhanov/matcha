import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsingSortComponent } from './browsing-sort.component';

describe('BrowsingSortComponent', () => {
  let component: BrowsingSortComponent;
  let fixture: ComponentFixture<BrowsingSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowsingSortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowsingSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
