import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealSearchComponent } from './meal-search.component';

describe('MealSearchComponent', () => {
  let component: MealSearchComponent;
  let fixture: ComponentFixture<MealSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MealSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
