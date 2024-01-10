import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannedMealComponent } from './planned-meal.component';

describe('PlannedMealComponent', () => {
  let component: PlannedMealComponent;
  let fixture: ComponentFixture<PlannedMealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlannedMealComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlannedMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
