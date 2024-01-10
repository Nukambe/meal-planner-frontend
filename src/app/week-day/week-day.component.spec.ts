import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekDayComponent } from './week-day.component';

describe('WeekDayComponent', () => {
  let component: WeekDayComponent;
  let fixture: ComponentFixture<WeekDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeekDayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeekDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
