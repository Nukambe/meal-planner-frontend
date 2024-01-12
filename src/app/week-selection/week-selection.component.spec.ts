import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekSelectionComponent } from './week-selection.component';

describe('WeekSelectionComponent', () => {
  let component: WeekSelectionComponent;
  let fixture: ComponentFixture<WeekSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeekSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeekSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
