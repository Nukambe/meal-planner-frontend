import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMealModalComponent } from './add-meal-modal.component';

describe('AddMealModalComponent', () => {
  let component: AddMealModalComponent;
  let fixture: ComponentFixture<AddMealModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMealModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMealModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
